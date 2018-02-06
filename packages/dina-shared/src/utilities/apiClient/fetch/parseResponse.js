module.exports = function parseResponse(response) {
  return response
    .json()
    .then(json => json, error => ({ error, response }))
    .then(json => {
      const { status } = response
      if (json.error && json.error.name === 'FetchError') {
        const error = {
          json: {
            message: `Status code: ${status} - ${json.error.message}`,
            status,
            type: json.error.type,
          },
          status,
        }
        throw error
      }

      if (status >= 200 && status < 300) {
        return {
          json,
          status,
        }
      }

      const error = {
        json: {
          ...json,
          status,
        },
        status,
      }

      throw error
    })
}
