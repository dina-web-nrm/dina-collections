const objectPath = require('object-path')

const { createIndexJob } = require('../../../../serviceInteractions')

const createLog = require('../../../../../../utilities/log')

const log = createLog('services/searchService/searchSpecimen/postHooks')

const deactivateJobs = ({ jobs, serviceInteractor, replacingJob }) => {
  const jobIds = jobs.map(({ id }) => {
    return id
  })
  log.debug(`Deactivating jobs with ids: [${jobIds.join(', ')}]`)
  return jobIds.map(jobId => {
    return serviceInteractor.call({
      operationId: 'jobSetJobFailed',
      request: {
        body: {
          data: {
            attributes: {
              error: `replaced by: ${replacingJob.id}`,
            },
          },
        },
        pathParams: {
          id: jobId,
        },
      },
    })
  })
}

const extractIdsFromJobs = ({ jobs }) => {
  log.debug(`Extracting ids from: ${jobs.length} jobs`)
  return jobs.reduce((ids, job) => {
    const jobSpecimenIds = objectPath.get(
      job,
      'attributes.operationRequest.body.data.attributes.ids'
    )
    log.debug(
      `Found the following ids in job with id: ${
        job.id
      }: [${jobSpecimenIds.join(', ')}]`
    )
    if (jobSpecimenIds && jobSpecimenIds.length) {
      return [...ids, ...jobSpecimenIds]
    }
    return ids
  }, [])
}

const filterJobsToConsolidate = ({ jobs = [] }) => {
  return jobs.filter(job => {
    return !!objectPath.get(
      job,
      'attributes.operationRequest.queryParams.consolidateJobs'
    )
  })
}

const consolidateJobsPostHook = ({ serviceInteractor, request }) => {
  const consolidateJobs = objectPath.get(request, 'queryParams.consolidateJobs')
  if (!consolidateJobs) {
    log.debug('Not consolidating jobs. consolidateJobs false')
    return Promise.resolve(true)
  }

  const filter = {
    deactivatedAt: 'null',
    failedAt: 'null',
    includeOperationIds: [
      'searchSpecimenRebuildView',
      'searchSpecimenUpdateView',
    ],
    startedAt: 'null',
    succeededAt: 'null',
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter,
        },
      },
      resource: 'job',
    })
    .then(({ data }) => {
      const jobsToConsolidate = filterJobsToConsolidate({
        jobs: data,
      })

      if (jobsToConsolidate.length === 0) {
        log.debug('Not consolidating jobs. no jobs')
        return null
      }

      if (jobsToConsolidate.length === 1) {
        log.debug('Not consolidating jobs since its only one job in queue')
        return null
      }

      log.debug(`Consolidating ${jobsToConsolidate.length} jobs`)
      const containsRebuildJob = jobsToConsolidate.some(job => {
        return (
          objectPath.get(job, 'attributes.operationId') ===
          'searchSpecimenRebuildView'
        )
      })

      return Promise.resolve()
        .then(() => {
          if (containsRebuildJob) {
            log.debug(`Contains rebuild job will replace all with rebuild job`)
            return createIndexJob({
              rebuild: true,
              serviceInteractor,
            })
          }
          log.debug(
            `Dont contain rebuild job will replace ${
              jobsToConsolidate.length
            } jobs `
          )
          return createIndexJob({
            searchSpecimenIds: extractIdsFromJobs({ jobs: jobsToConsolidate }),
            serviceInteractor,
          })
        })
        .then(({ data: replacingJob }) => {
          return deactivateJobs({
            jobs: jobsToConsolidate,
            replacingJob,
            serviceInteractor,
          })
        })
    })
}

exports.rebuildView = [consolidateJobsPostHook]

exports.updateView = [consolidateJobsPostHook]
