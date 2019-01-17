const prompt = require('prompt')

prompt.colors = false
prompt.message = ''
module.exports = function promptContinue(
  { message, question = 'Are you sure you want to proceed? y/n' } = {}
) {
  if (message) {
    console.log(message)
  }
  return new Promise((resolve, reject) => {
    prompt.start()
    prompt.get(
      [
        {
          description: question,
          message: 'provide y/n',
          name: 'proceed',
          required: true,
        },
      ],
      (err, { proceed }) => {
        if (err) {
          return reject(err)
        }
        if (proceed === 'y') {
          return resolve()
        }
        console.log(`Got: ${proceed}. Aborting`)
        return reject()
      }
    )
  })
}
