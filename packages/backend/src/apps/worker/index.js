const { bootstrapWorker } = require('../../lib/bootstrap')
const serviceConfigurations = require('../../serviceConfigurations')

bootstrapWorker({
  serviceConfigurations,
})
