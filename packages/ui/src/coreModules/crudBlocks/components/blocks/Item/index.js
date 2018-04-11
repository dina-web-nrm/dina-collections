import React from 'react'
import PropTypes from 'prop-types'

import { CREATE, EDIT, INSPECT } from '../../../constants'
import CreateBlock from './Create'
import EditBlock from './Edit'
import InspectBlock from './Inspect'

const propTypes = {
  disableEdit: PropTypes.bool.isRequired,
  itemBlockType: PropTypes.string.isRequired,
  renderCreateBlockChild: PropTypes.func,
  renderEditBlockChild: PropTypes.func,
  renderInspectBlockChild: PropTypes.func,
}
const defaultProps = {
  renderCreateBlockChild: undefined,
  renderEditBlockChild: undefined,
  renderInspectBlockChild: undefined,
}

const ItemBlock = ({
  disableEdit,
  itemBlockType,
  renderCreateBlockChild,
  renderEditBlockChild,
  renderInspectBlockChild,
  ...rest
}) => {
  if (itemBlockType === CREATE && renderCreateBlockChild) {
    return (
      <CreateBlock
        itemBlockType={itemBlockType}
        renderChild={renderCreateBlockChild}
        {...rest}
      />
    )
  }

  if (itemBlockType === EDIT && renderEditBlockChild && !disableEdit) {
    return (
      <EditBlock
        itemBlockType={itemBlockType}
        renderChild={renderEditBlockChild}
        {...rest}
      />
    )
  }
  if (itemBlockType === INSPECT && renderInspectBlockChild) {
    return (
      <InspectBlock
        itemBlockType={itemBlockType}
        renderChild={renderInspectBlockChild}
        {...rest}
      />
    )
  }
  return null
}

ItemBlock.propTypes = propTypes
ItemBlock.defaultProps = defaultProps

export default ItemBlock
