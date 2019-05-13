const createLog = require('../../../utilities/log')
const objectPath = require('object-path')

const log = createLog('lib/data/hooks/createConsolidateJobsPostHook')

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
    const operationIds = objectPath.get(
      job,
      'attributes.operationRequest.body.data.attributes.ids'
    )
    log.debug(
      `Found the following ids in job with id: ${job.id}: [${operationIds.join(
        ', '
      )}]`
    )
    if (operationIds && operationIds.length) {
      return [...ids, ...operationIds]
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

module.exports = function createConsolidateJobsPostHook({
  createIndexJob,
  rebuildViewOperationId,
  updateViewOperationId,
}) {
  return function consolidateJobsPostHook({ serviceInteractor, request }) {
    const consolidateJobs = objectPath.get(
      request,
      'queryParams.consolidateJobs'
    )
    if (!consolidateJobs) {
      log.info('Not consolidating jobs. consolidateJobs false')
      return Promise.resolve(true)
    }

    const filter = {
      deactivatedAt: 'null',
      failedAt: 'null',
      includeOperationIds: [rebuildViewOperationId, updateViewOperationId],
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
          log.info('Not consolidating jobs. no jobs')
          return null
        }

        if (jobsToConsolidate.length === 1) {
          log.info('Not consolidating jobs since its only one job in queue')
          return null
        }

        log.info(`Consolidating ${jobsToConsolidate.length} jobs`)
        const containsRebuildJob = jobsToConsolidate.some(job => {
          return (
            objectPath.get(job, 'attributes.operationId') ===
            rebuildViewOperationId
          )
        })

        return Promise.resolve()
          .then(() => {
            if (containsRebuildJob) {
              log.debug(
                `Contains rebuild job will replace all with rebuild job`
              )
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
              ids: extractIdsFromJobs({ jobs: jobsToConsolidate }),
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
}
