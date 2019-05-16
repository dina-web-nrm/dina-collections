import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import createEditItemWrapper from '../../higherOrderComponents/createEditItemWrapper'
import ActionBar from '../ActionBar'

const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  buildEditItemHeaders: PropTypes.func.isRequired,
  focusedItemId: PropTypes.string,
  formName: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  navigateEdit: PropTypes.func.isRequired,
  nestedItem: PropTypes.object,
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  setFocusedItemId: PropTypes.func.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
  formName: undefined,
  nestedItem: undefined,
}

const EditItemColumn = props => {
  const {
    availableHeight,
    buildEditItemHeaders,
    focusedItemId,
    itemId,
    navigateEdit,
    nestedItem,
    renderEditForm,
    setFocusedItemId,
  } = props

  const { itemHeader, itemSubHeader } = buildEditItemHeaders(nestedItem)

  const itemIdRef = useRef(null)
  const focusedItemIdRef = useRef(null)

  useEffect(() => {
    // reconcile differences in itemId from query and focusedItemId from state
    // if we get an itemId that has changed and is different from focusedItemId
    // then set it as the focusedItemId
    // else if we get a focusedItemId that has changed and is different from the
    // itemId, then navigate to the new focusedItemId

    const previousItemId = itemIdRef.current
    const previousFocusedItemId = focusedItemIdRef.current

    if (itemId && focusedItemId !== itemId && itemId !== previousItemId) {
      setFocusedItemId(itemId)
    } else if (
      focusedItemId &&
      focusedItemId !== itemId &&
      focusedItemId !== previousFocusedItemId
    ) {
      navigateEdit(focusedItemId)
    }

    itemIdRef.current = itemId
    focusedItemIdRef.current = focusedItemId
  }, [focusedItemId, itemId, navigateEdit, setFocusedItemId])

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
        <ActionBar
          {...pick(props, [
            'formName',
            'loadingDelete',
            'nestedItem',
            'onDelete',
            'onSubmit',
            'onUndoChanges',
          ])}
        />
      </RowLayout.Row>
    </RowLayout>
  )
}

EditItemColumn.defaultProps = defaultProps
EditItemColumn.propTypes = propTypes

export default compose(createEditItemWrapper())(EditItemColumn)
