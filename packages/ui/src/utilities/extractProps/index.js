export default function extractProps({ props = {}, keys = [] }) {
  const rest = {}
  const extractedProps = {}

  Object.keys(props).forEach(propName => {
    if (keys.includes(propName)) {
      extractedProps[propName] = props[propName]
    } else {
      rest[propName] = props[propName]
    }
  })
  return {
    extractedProps,
    rest,
  }
}
