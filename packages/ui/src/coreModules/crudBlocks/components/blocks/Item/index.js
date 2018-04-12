import React from 'react'
import PropTypes from 'prop-types'

import { CREATE, EDIT, INSPECT } from '../../../constants'
import CreateBlock from './Create'
import EditBlock from './Edit'
import InspectBlock from './Inspect'

const propTypes = {
  disableEdit: PropTypes.bool.isRequired,
  itemBlockType: PropTypes.string.isRequired,
  renderCreateForm: PropTypes.func,
  renderEditForm: PropTypes.func,
  renderInspectView: PropTypes.func,
}
const defaultProps = {
  renderCreateForm: undefined,
  renderEditForm: undefined,
  renderInspectView: undefined,
}

const ItemBlock = ({
  disableEdit,
  itemBlockType,
  renderCreateForm,
  renderEditForm,
  renderInspectView,
  ...rest
}) => {
  if (itemBlockType === CREATE && renderCreateForm) {
    return (
      <CreateBlock
        itemBlockType={itemBlockType}
        renderChild={renderCreateForm}
        {...rest}
      />
    )
  }

  if (itemBlockType === EDIT && renderEditForm && !disableEdit) {
    return (
      <EditBlock
        itemBlockType={itemBlockType}
        renderChild={renderEditForm}
        {...rest}
      />
    )
  }
  if (itemBlockType === INSPECT && renderInspectView) {
    return (
      <InspectBlock
        itemBlockType={itemBlockType}
        renderChild={renderInspectView}
        {...rest}
      />
    )
  }
  return null
}

ItemBlock.propTypes = propTypes
ItemBlock.defaultProps = defaultProps

export default ItemBlock
