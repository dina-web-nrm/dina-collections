const createSortAlphabeticallyByProperty = (sortProperty = 'name') => {
  return (a, b) => {
    if (!a || !b) {
      return 0
    }

    const valueA = a[sortProperty]
    const valueB = b[sortProperty]

    if (!valueA && !valueB) {
      return 0
    }

    if (!valueA) {
      return 1
    }

    if (!valueB) {
      return -1
    }

    if (valueA < valueB) {
      return -1
    }

    if (valueA > valueB) {
      return 1
    }

    return 0
  }
}

module.exports = createSortAlphabeticallyByProperty
