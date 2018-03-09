const errorStatus = {
  400: {
    title: 'Bad Request',
  },
  401: {
    title: 'Unauthorized',
  },
  403: {
    title: 'Forbidden',
  },
  404: {
    title: 'Not Found',
  },
  405: {
    title: 'Method Not Allowed',
  },
  406: {
    title: 'Not Acceptable',
  },
  415: {
    title: '??',
  },
  500: {
    title: 'Internal Server Error',
  },
  501: {
    title: 'Not Implemented',
  },
}

module.exports = Object.keys(errorStatus).reduce((obj, key) => {
  return {
    ...obj,
    [key]: {
      ...errorStatus[key],
      status: key,
    },
  }
}, {})
