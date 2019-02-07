module.exports = function getNext({
  excludeGroups,
  includeGroups,
  serviceInteractor,
}) {
  const filter = {
    deactivatedAt: 'null',
    failedAt: 'null',
    startedAt: 'null',
    succeededAt: 'null',
  }

  if (excludeGroups && excludeGroups.length) {
    filter.excludeGroups = excludeGroups
  }

  if (includeGroups && includeGroups.length) {
    filter.includeGroups = includeGroups
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter,
          limit: 1,
          sort: 'priority:desc',
        },
      },
      resource: 'job',
    })
    .then(res => {
      const jobs = res && res.data
      if (jobs && jobs.length) {
        return jobs[0]
      }
      return null
    })
}
