import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { LayerModal } from 'coreModules/commonUi/components'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import LocalityDropdownSearch from '../LocalityDropdownSearch'

let LocalityManager = null

export function setLocalManager(injected) {
  LocalityManager = injected
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

export class LocalityDropdownPickerSearch extends Component {
  render() {
    const {
      excludeRootNode,
      fieldSearchQuery,
      fieldValue,
      onClose,
      onInteraction,
      onPickerButtonClick,
      pickerActive,
      ...rest
    } = this.props

    if (pickerActive) {
      const initialFilterValues = fieldSearchQuery
        ? {
            name: fieldSearchQuery,
          }
        : undefined

      return (
        <LayerModal onClose={onClose} open style={{ overflow: 'hidden' }}>
          <Modal.Content>
            <LocalityManager
              excludeRootNode={excludeRootNode}
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick geography"
              treeEnabled
            />
          </Modal.Content>
        </LayerModal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Pick</Button>

    return (
      <LocalityDropdownSearch
        excludeRootNode={excludeRootNode}
        rightButton={picker}
        {...rest}
      />
    )
  }
}

LocalityDropdownPickerSearch.propTypes = propTypes
LocalityDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({})(LocalityDropdownPickerSearch)
