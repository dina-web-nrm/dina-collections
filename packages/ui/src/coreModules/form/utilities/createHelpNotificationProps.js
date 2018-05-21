export default function createHelpNotificationProps({
  context,
  labelKey,
  module,
  parameterKey,
}) {
  const descriptionHeaderKey = labelKey

  const model = parameterKey.split('.')[0]
  const descriptionKey = ['modules', module, context, parameterKey].join('.')
  const linkTo = `/docs/0.1.0/models/${model}`
  const linkTextKey = `${parameterKey}`

  return {
    descriptionHeaderKey,
    descriptionKey,
    linkTextKey,
    linkTo,
  }
}
