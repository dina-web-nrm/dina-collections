const now = require('performance-now')
const objectPath = require('object-path')

module.exports = function createReporter() {
  const report = {}

  const set = ({ path, value }) => {
    objectPath.set(report, path, value)
  }

  const get = ({ path }) => {
    return objectPath.get(report, path)
  }

  const increment = ({ path }) => {
    let count = get({ path })
    if (count === undefined || count === null) {
      count = 1
    } else {
      count += 1
    }

    set({ path, value: count })
  }

  const getReport = () => {
    return report
  }

  const start = () => {
    const startTime = now()
    set({
      path: 'startTime',
      value: startTime,
    })
  }

  const done = () => {
    const endTime = now()
    set({
      path: 'endTime',
      value: endTime,
    })

    const startTime = get({
      path: 'startTime',
    })

    const totalTime = endTime - startTime

    set({
      path: 'totalTime',
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
