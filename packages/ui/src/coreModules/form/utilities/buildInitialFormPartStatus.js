const buildInitialFormPartStatus = (specs, formPartName) => {
  if (!specs) {
    throw new Error(`missing specs in form part: ${formPartName}`)
  }

  if (!Array.isArray(specs)) {
    throw new Error(`specs are not array in form part: ${formPartName}`)
  }

  return specs.reduce((statuses, { name }) => {
    if (!name) {
      return statuses
    }

    return {
      ...statuses,
      [name]: {
        dirty: false,
        invalid: false,
      },
    }
  }, {})
}

export default buildInitialFormPartStatus
