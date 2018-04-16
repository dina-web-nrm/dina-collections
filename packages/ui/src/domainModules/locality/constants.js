export const ALL = 'all'
export const CONTINENT = 'continent'
export const COUNTRY = 'country'
export const DISTRICT = 'district'
export const PROVINCE = 'province'

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE]

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
