const now = require('performance-now')
const objectPath = require('object-path')
const immutable = require('object-path-immutable')

module.exports = function createReporter() {
  let report = {}

  const set = ({ path, value }) => {
    report = immutable.set(report, path, value)
  }

  const get = ({ path }) => {
    return objectPath.get(report, path)
  }

  const increment = ({ path }) => {
    report = immutable.update(report, path, count => {
      if (count === undefined || count === null) {
        return 1
      }
      return count + 1
    })
  }

  const getReport = () => {
    return report
  }

  const start = () => {
    const startTime = now()
    set({
      path: 'migrations.startTime',
      value: startTime,
    })
  }

  const done = () => {
    const endTime = now()
    set({
      path: 'migrations.endTime',
      value: endTime,
    })

    const startTime = get({
      path: 'migrations.startTime',
    })

    const totalTime = endTime - startTime

    set({
      path: 'migrations.totalTime',
      value: `${totalTime} ms`,
    })
  }

  return {
    done,
    getReport,
    increment,
    start,
  }
}
