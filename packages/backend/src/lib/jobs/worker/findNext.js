module.exports = function getNext({ serviceInteractor }) {
  const filter = {
    deactivatedAt: 'null',
    failedAt: 'null',
    startedAt: 'null',
    succeededAt: 'null',
  }
  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          filter,
          limit: 1,
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
