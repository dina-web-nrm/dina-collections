export const formatBooleanRadio = value => {
  if (value === true) return 'true'
  if (value === false) return 'false'
  return undefined
}
export const parseBooleanRadio = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return undefined
}
