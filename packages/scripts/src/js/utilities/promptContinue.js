const promptPromise = require('./promptPromise')

module.exports = function promptContinue(
  { message, question = 'Are you sure you want to proceed? y/n' } = {}
) {
  if (message) {
    console.log(message)
  }

  return promptPromise([
    {
      description: question,
      message: 'provide y/n',
      name: 'proceed',
      required: true,
    },
  ]).then(({ proceed }) => {
    if (proceed === 'y') {
      return true
    }
    throw new Error(`Got: ${proceed}. Aborting`)
  })
}
