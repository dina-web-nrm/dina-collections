const buildInitialFormPartStatus = specs => {
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
