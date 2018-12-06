import React from 'react'

const findParentWithSpecificGroup = (item, group) => {
  if (!item) {
    return null
  }

  if (item.group === group) {
    return item
  }

  if (!(item && item.parent)) {
    return null
  }

  return findParentWithSpecificGroup(item.parent, group)
}

const tableColumnSpecifications = [
  {
    fieldPath: 'name',
    label: 'modules.locality.fieldLabels.place.name',
    width: 250,
  },
  {
    fieldPath: 'group',
    label: 'modules.locality.fieldLabels.place.group',
    width: 150,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(
        value.parent,
        'continent-ocean'
      )
      if (!parent) {
        return ''
      }
      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${parent.name} (removed)`}</span>
        )
      }

      return parent.name
    },
    fieldPath: '',
    label: 'modules.locality.fieldLabels.continent',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'country')
      if (!parent) {
        return ''
      }
      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${parent.name} (removed)`}</span>
        )
      }

      return parent.name
    },
    fieldPath: '',
    label: 'modules.locality.fieldLabels.country',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'province')
      if (!parent) {
        return ''
      }
      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${parent.name} (removed)`}</span>
        )
      }

      return parent.name
    },
    fieldPath: '',
    label: 'modules.locality.fieldLabels.province',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'district')
      if (!parent) {
        return ''
      }
      if (parent.deactivatedAt) {
        return (
          <span style={{ color: 'red' }}>{`${parent.name} (removed)`}</span>
        )
      }

      return parent.name
    },
    fieldPath: '',
    label: 'modules.locality.fieldLabels.district',
    width: 250,
  },
]

export default tableColumnSpecifications
