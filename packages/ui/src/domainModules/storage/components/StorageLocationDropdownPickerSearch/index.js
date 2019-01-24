import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { LayerModal } from 'coreModules/commonUi/components'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import StorageLocationDropdownSearch from '../StorageLocationDropdownSearch'

let StorageLocationManager = null

export function setLocalStorageLocationManager(injected) {
  StorageLocationManager = injected
}
const propTypes = {
  excludeRootNode: PropTypes.bool,
  fieldSearchQuery: PropTypes.string,
  fieldValue: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onPickerButtonClick: PropTypes.func.isRequired,
  pickerActive: PropTypes.bool.isRequired,
}

const defaultProps = {
  excludeRootNode: true,
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
      excludeRootNode,
      ...rest
    } = this.props
    const initialFilterValues = fieldSearchQuery
      ? {
          name: fieldSearchQuery,
        }
      : undefined

    if (pickerActive) {
      return (
        <LayerModal onClose={onClose} open style={{ overflow: 'hidden' }}>
          <Modal.Content>
            <StorageLocationManager
              excludeRootNode={excludeRootNode}
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick storage location"
              treeEnabled
            />
          </Modal.Content>
        </LayerModal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Pick</Button>

    return (
      <StorageLocationDropdownSearch
        excludeRootNode={excludeRootNode}
        rightButton={picker}
        {...rest}
      />
    )
  }
}

StorageLocationDropdownPickerSearch.defaultProps = defaultProps
StorageLocationDropdownPickerSearch.propTypes = propTypes

export default createPickerWrapper({})(StorageLocationDropdownPickerSearch)
