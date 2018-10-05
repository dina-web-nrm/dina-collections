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
    label: 'modules.storage.fieldLabels.storageLocation.name',
    width: 350,
  },
  {
    fieldPath: 'group',
    label: 'modules.storage.fieldLabels.storageLocation.group',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'Level 1')
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
    label: 'modules.storage.fieldLabels.level1',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'Level 2')
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
    label: 'modules.storage.fieldLabels.level2',
    width: 250,
  },
  {
    buildText: ({ value }) => {
      const parent = findParentWithSpecificGroup(value.parent, 'Level 3')
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
      const parent = findParentWithSpecificGroup(value.parent, 'Level 4')
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
    label: 'modules.storage.fieldLabels.level4',
    width: 250,
  },
  {
    fieldPath: 'description',
    label: 'modules.storage.fieldLabels.storageLocation.description',
    width: 350,
  },
]
export default tableColumnSpecifications
