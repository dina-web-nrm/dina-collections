export const ALL = 'all'
export const PERSON = 'person'
export const ORGANIZATION = 'organization'

const groups = [PERSON, ORGANIZATION]

export const DROPDOWN_FILTER_OPTIONS = [
  {
    key: ALL,
    text: ALL,
    value: '',
  },
  ...groups.map(group => {
    return {
      key: group,
      text: group,
      value: group,
    }
  }),
]
