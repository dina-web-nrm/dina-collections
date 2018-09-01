import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import StorageLocationDropdownSearch from '../StorageLocationDropdownSearch'
import StorageLocationManager from '../StorageLocationManager/Local'

const propTypes = {
  fieldSearchQuery: PropTypes.string,
  fieldValue: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onPickerButtonClick: PropTypes.func.isRequired,
  pickerActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  fieldSearchQuery: undefined,
  fieldValue: undefined,
}

export class StorageLocationDropdownPickerSearch extends Component {
  render() {
    const {
      fieldSearchQuery,
      fieldValue,
      onClose,
      onInteraction,
      onPickerButtonClick,
      pickerActive,
      ...rest
    } = this.props
    const initialFilterValues = fieldSearchQuery
      ? {
          name: fieldSearchQuery,
        }
      : undefined

    if (pickerActive) {
      return (
        <Modal onClose={onClose} open size="fullscreen">
          <Modal.Content>
            <StorageLocationManager
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Storage"
              treeEnabled
            />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <StorageLocationDropdownSearch rightButton={picker} {...rest} />
  }
}

StorageLocationDropdownPickerSearch.defaultProps = defaultProps
StorageLocationDropdownPickerSearch.propTypes = propTypes

export default createPickerWrapper({})(StorageLocationDropdownPickerSearch)
