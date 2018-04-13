const startString = '## Short description'
const stopString = '#'

module.exports = function splitDescription(descriptionInput) {
  const descriptionArray = (descriptionInput || '').split('\n')

  let summaryStart
  let summaryStop

  descriptionArray.forEach((line, index) => {
    if (
      summaryStop === undefined &&
      summaryStart !== undefined &&
      line.indexOf(stopString) > -1
    ) {
      summaryStop = index
    }
    if (summaryStart === undefined && line.indexOf(startString) > -1) {
      summaryStart = index
    }
  })

  let description = descriptionInput
  let summary = ''

  if (summaryStart !== undefined && summaryStop !== undefined) {
    const summaryArray = descriptionArray.splice(
      summaryStart,
      summaryStop - summaryStart
    )
    summary = summaryArray
      .join(' ')
      .replace(startString, '')
      .replace(new RegExp('#', 'g'), '')
      .trim()

    description = descriptionArray.join('\n').trim()
  }

  return {
    description,
    summary,
  }
}
