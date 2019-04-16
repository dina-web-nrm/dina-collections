const chainPromiseWithPromisifiedFunction = (promise, func) => {
  return promise.then(result => {
    return Promise.resolve(func(result))
  })
}

const getPromisifiedInitialValue = initialValue => {
  return initialValue !== undefined
    ? Promise.resolve(initialValue)
    : Promise.resolve()
}

module.exports = function chainPromises(functions, initialValue) {
  return Promise.resolve(
    functions
      .filter(Boolean) // some parts of a chain might be optional
      .reduce(
        chainPromiseWithPromisifiedFunction,
        getPromisifiedInitialValue(initialValue)
      )
  )
}
