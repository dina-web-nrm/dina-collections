import coreToNestedSync from 'common/es5/formatObject/coreToNestedSync'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { getItemWithSpecificedRelationships } from 'coreModules/crud/utilities'
import { actionCreators as keyObjectActionCreators } from '../keyObjectModule'

const setNestedItemActionCreator =
  keyObjectActionCreators.set['nestedCache.:nameSpace.items.:id']

export default function createNestedItem({
  item,
  nameSpace,
  relationships = [],
  resolveRelationships = [],
  resource,
  storeResult = true,
}) {
  return (dispatch, getState) => {
    const state = getState()
    const getItemByTypeId = (type, id) => {
      if (!resolveRelationships.includes(type)) {
        return null
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
        relationshipKeys: relationships,
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
          nameSpace,
        })
      )
    }

    return nested
  }
}
