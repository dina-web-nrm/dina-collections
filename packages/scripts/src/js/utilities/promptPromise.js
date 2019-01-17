const prompt = require('prompt')

prompt.colors = false
prompt.message = ''
module.exports = function promptPromise(...args) {
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get(...args, (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}
