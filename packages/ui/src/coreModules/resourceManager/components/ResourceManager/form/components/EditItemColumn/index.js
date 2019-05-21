import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { capitalizeFirstLetter } from 'common/src/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import createFormModuleWrapper from '../../higherOrderComponents/createFormModuleWrapper'
import { EditItemActionBar } from '../ActionBars'

const overflowAuto = { overflow: 'auto' }

const defaultBuildItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.name,
    itemSubHeader: capitalizeFirstLetter(nestedItem.group),
  }
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  buildEditItemHeaders: PropTypes.func,
  focusedItemId: PropTypes.string,
  formName: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  nestedItem: PropTypes.object,
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  buildEditItemHeaders: defaultBuildItemHeaders,
  focusedItemId: undefined,
  formName: undefined,
  nestedItem: undefined,
}

const EditItemColumn = props => {
  const {
    availableHeight,
    buildEditItemHeaders,
    focusedItemId,
    formName,
    itemId,
    navigateEdit,
    nestedItem,
    renderEditForm,
    resource,
  } = props

  const { itemHeader, itemSubHeader } = buildEditItemHeaders(nestedItem)

  useEffect(() => {
    if (focusedItemId && focusedItemId !== itemId) {
      navigateEdit(focusedItemId)
    }
  }, [focusedItemId, itemId, navigateEdit])

  return (
    <RowLayout availableHeight={availableHeight}>
      <RowLayout.Row style={overflowAuto}>
        {renderEditForm({
          ...props,
          itemHeader,
          itemSubHeader,
        })}
      </RowLayout.Row>
      <RowLayout.Row height={emToPixels(4.625)}>
        <EditItemActionBar
          {...pick(props, [
            'fetchOneItemById',
            'fetchRelationshipsBeforeDelete',
            'filterResourceCount',
            'itemId',
            'loadingDelete',
            'nestedItem',
            'onInteraction',
            'relationshipsToCheckBeforeDelete',
            'resource',
            'transformOutput',
          ])}
          formName={formName || `${resource}Edit`}
          itemHeader={itemHeader}
          itemSubHeader={itemSubHeader}
        />
      </RowLayout.Row>
    </RowLayout>
  )
}

EditItemColumn.defaultProps = defaultProps
EditItemColumn.propTypes = propTypes

export default compose(
  createFormModuleWrapper(),
  createGetNestedItemById()
)(EditItemColumn)
