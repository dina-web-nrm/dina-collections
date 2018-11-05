import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import LocalityDropdownSearch from '../LocalityDropdownSearch'
import LocalityManager from '../LocalityManager/Local'

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

export class LocalityDropdownPickerSearch extends Component {
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

    if (pickerActive) {
      const initialFilterValues = fieldSearchQuery
        ? {
            name: fieldSearchQuery,
          }
        : undefined

      return (
        <Modal onClose={onClose} open style={{ overflow: 'hidden' }}>
          <Modal.Content>
            <LocalityManager
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Locality"
              treeEnabled
            />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <LocalityDropdownSearch rightButton={picker} {...rest} />
  }
}

LocalityDropdownPickerSearch.propTypes = propTypes
LocalityDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({})(LocalityDropdownPickerSearch)
