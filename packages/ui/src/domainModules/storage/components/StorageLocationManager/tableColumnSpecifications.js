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
    label: 'modules.storage.fieldLabels.name',
    width: 350,
  },
  {
    fieldPath: 'group',
    label: 'modules.storage.fieldLabels.group',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value, 'room')
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
    label: 'modules.storage.fieldLabels.room',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value, 'mountingWall')
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
    label: 'modules.storage.fieldLabels.mountingWall',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value, 'level 3')
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
    label: 'modules.storage.fieldLabels.level3',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value, 'shelf')
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
    label: 'modules.storage.fieldLabels.shelf',
    width: 250,
  },
  {
    fieldPath: 'description',
    label: 'modules.storage.fieldLabels.description',
    width: 350,
  },
]
export default tableColumnSpecifications
