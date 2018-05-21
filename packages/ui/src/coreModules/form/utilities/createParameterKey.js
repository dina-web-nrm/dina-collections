export default function createParameterKey({ model: baseModel, name } = {}) {
  if (!name) {
    return undefined
  }

  const segments = name.split('.')

  const { model: modelSegment, parameter: parameterSegment } = segments
    .reverse()
    .filter(segment => {
      const isNumeric = !Number.isNaN(parseFloat(segment))
      return !isNumeric
    })
    .reduce(
      ({ model, parameter }, segment) => {
        if (model) {
          return {
            model,
            parameter,
          }
        }
        if (segment === 'id') {
          return {
            model,
            parameter,
          }
        }
        if (!parameter) {
          return {
            model,
            parameter: segment,
          }
        }
        return {
          model: segment,
          parameter,
        }
      },
      {
        model: undefined,
        parameter: undefined,
      }
    )
  if (!parameterSegment) {
    return undefined
  }

  if (modelSegment && parameterSegment) {
    return [modelSegment, parameterSegment].join('.')
  }

  if (!modelSegment && baseModel) {
    return [baseModel, parameterSegment].join('.')
  }

  return parameterSegment
}
