import coreToNestedSync from 'common/es5/formatObject/coreToNestedSync'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { getItemWithSpecificedRelationships } from 'coreModules/crud/utilities'
import { actionCreators as keyObjectActionCreators } from '../keyObjectModule'

const setNestedItemActionCreator =
  keyObjectActionCreators.set['nestedCache.:namespace.items.:id']

export default function createNestedItem({
  item,
  namespace,
  relationships = [],
  resolveRelationships = [],
  resource,
  storeResult = true,
}) {
  const parentRelationships = relationships.includes('all')
    ? []
    : relationships.filter(relationship => {
        if (relationship === 'children') {
          return false
        }
        return true
      })

  const childrenRelationships = relationships.includes('all')
    ? []
    : relationships.filter(relationship => {
        if (relationship === 'parent') {
          return false
        }
        return true
      })

  return (dispatch, getState) => {
    const state = getState()
    const getItemByTypeId = (type, id, { relationshipKey } = {}) => {
      if (!resolveRelationships.includes(type)) {
        return null
      }

      let getItemByTypeRelationships = relationships
      if (relationshipKey === 'parent') {
        getItemByTypeRelationships = parentRelationships
      }
      if (relationshipKey === 'children') {
        getItemByTypeRelationships = childrenRelationships
      }

      const getOneSelector = crudSelectors[type] && crudSelectors[type].getOne
      const getOneByLidSelector =
        crudSelectors[type] && crudSelectors[type].getOneByLid

      const dependencyItem =
        (getOneSelector && getOneSelector(state, id)) ||
        (getOneByLidSelector && getOneByLidSelector(state, id)) ||
        null

      if (!dependencyItem) {
        return dependencyItem
      }

      const itemWithRelationships = getItemWithSpecificedRelationships({
        item: dependencyItem,
        relationshipKeys: getItemByTypeRelationships,
      })

      if (!itemWithRelationships) {
        return null
      }
      return itemWithRelationships
    }

    const nested = coreToNestedSync({
      getItemByTypeId,
      item: getItemWithSpecificedRelationships({
        item,
        relationshipKeys: relationships,
      }),
      type: resource,
    })
    if (storeResult) {
      dispatch(
        setNestedItemActionCreator(nested, {
          id: item.id,
          namespace,
        })
      )
    }

    return nested
  }
}
