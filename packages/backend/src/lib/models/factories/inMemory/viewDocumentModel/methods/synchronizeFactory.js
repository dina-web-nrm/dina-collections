module.exports = function synchronizeFactory({ ViewModel, StageModel } = {}) {
  if (!ViewModel || !StageModel) {
    throw new Error('Have to provide model')
  }

  return function synchronize({ force = false } = {}) {
    return Promise.all([
      ViewModel.synchronize({ force }),
      StageModel.synchronize({ force }),
    ])
  }
}
