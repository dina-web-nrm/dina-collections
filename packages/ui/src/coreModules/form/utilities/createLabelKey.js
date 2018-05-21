export default function createLabelKey({ context, module, parameterKey }) {
  if (!module || !parameterKey) {
    return undefined
  }
  return ['modules', module, context, parameterKey].join('.')
}
