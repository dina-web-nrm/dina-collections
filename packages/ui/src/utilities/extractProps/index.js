export default function extractProps({ props = {}, defaults = {}, keys = [] }) {
  const defaultsProvided = Object.keys(defaults).length
  const rest = {}
  const extractedProps = {}
  const propNames = defaultsProvided
    ? Object.keys({
        ...props,
        ...defaults,
      })
    : Object.keys(props)

  propNames.forEach(propName => {
    if (keys.includes(propName)) {
      extractedProps[propName] =
        props[propName] !== undefined ? props[propName] : defaults[propName]
    } else {
      rest[propName] =
        props[propName] !== undefined ? props[propName] : defaults[propName]
    }
  })
  return {
    extractedProps,
    rest,
  }
}
