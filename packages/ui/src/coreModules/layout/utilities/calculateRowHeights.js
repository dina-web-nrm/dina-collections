const calculateRowHeights = ({ availableHeight, rows } = {}) => {
  if (!rows) {
    throw new Error('missing rows')
  }

  if (!rows.length) {
    return []
  }

  const specifiedHeights = rows.map(({ height }) => height)

  if (!availableHeight) {
    return specifiedHeights
  }

  const specifiedHeightsInPixels = specifiedHeights.map(height => {
    if (!height) {
      return height
    }

    if (height.endsWith('px')) {
      return Number(height.slice(0, -2))
    }

    if (height.endsWith('%')) {
      return availableHeight * Number(height.slice(0, -1)) / 100
    }

    throw new Error('height must be in % or px')
  })

  const indexOfRestRow = specifiedHeights.findIndex(
    height => height === undefined
  )

  if (indexOfRestRow !== undefined) {
    const sumOfSpecifiedPixelHeights = specifiedHeightsInPixels.reduce(
      (sum, height) => {
        if (!height) {
          return sum
        }
        return sum + height
      },
      0
    )

    const restHeight = availableHeight - sumOfSpecifiedPixelHeights

    specifiedHeightsInPixels[indexOfRestRow] = restHeight
  }

  return specifiedHeightsInPixels.map(pixels => `${pixels}px`)
}

export default calculateRowHeights
