const calculateColumnWidths = ({ availableWidth, columns } = {}) => {
  if (!columns) {
    throw new Error('missing columns')
  }

  if (!columns.length) {
    return []
  }

  const specifiedWidths = columns.map(({ width }) => width)

  if (!availableWidth) {
    return specifiedWidths
  }

  const specifiedWidthsInPixels = specifiedWidths.map(width => {
    if (!width) {
      return width
    }

    if (width.endsWith('px')) {
      return Number(width.slice(0, -2))
    }

    if (width.endsWith('%')) {
      return (availableWidth * Number(width.slice(0, -1))) / 100
    }

    throw new Error('width must be in % or px')
  })

  const indexOfRestColumn = specifiedWidths.findIndex(
    width => width === undefined
  )

  if (indexOfRestColumn !== undefined) {
    const sumOfSpecifiedPixelWidths = specifiedWidthsInPixels.reduce(
      (sum, width) => {
        if (!width) {
          return sum
        }
        return sum + width
      },
      0
    )

    const restWidth = availableWidth - sumOfSpecifiedPixelWidths

    specifiedWidthsInPixels[indexOfRestColumn] = restWidth
  }

  return specifiedWidthsInPixels.map(pixels => `${pixels}px`)
}

export default calculateColumnWidths
