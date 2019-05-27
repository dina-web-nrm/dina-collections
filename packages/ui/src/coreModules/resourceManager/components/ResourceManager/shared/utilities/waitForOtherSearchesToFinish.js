export default function waitForOtherSearchesToFinish(getSearchInProgress) {
  let count = 0
  const wait = () => {
    count += 1
    if (count > 5) {
      return Promise.resolve()
    }
    return new Promise(resolve => {
      const searchInProgress = getSearchInProgress()
      if (!searchInProgress) {
        return resolve(true)
      }

      return setTimeout(() => {
        return wait().then(() => {
          resolve(true)
        })
      }, 1000)
    })
  }

  return wait()
}
