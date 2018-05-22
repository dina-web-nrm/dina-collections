export const createErrorKey = ({
  context,
  errorCode,
  module,
  parameterKey,
}) => {
  return ['modules', module, context, parameterKey, errorCode]
    .filter(segment => {
      return !!segment
    })
    .join('.')
}

export default function createErrorKeys({
  context,
  errorCode,
  module,
  parameterKey,
}) {
  if (!errorCode) {
    return undefined
  }

  const errorKeys = []
  if (module) {
    errorKeys.push(
      createErrorKey({
        context,
        errorCode,
        module,
        parameterKey,
      })
    )

    errorKeys.push(
      createErrorKey({
        context,
        module,
        parameterKey,
      })
    )

    errorKeys.push(
      createErrorKey({
        context,
        errorCode,
        module,
      })
    )
  }

  errorKeys.push(
    createErrorKey({
      errorCode,
      module: 'error',
      parameterKey,
    })
  )

  errorKeys.push(
    createErrorKey({
      module: 'error',
      parameterKey,
    })
  )

  errorKeys.push(
    createErrorKey({
      errorCode,
      module: 'error',
    })
  )

  return errorKeys
}
