import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import TaxonDropdownSearch from '../TaxonDropdownSearch'
import TaxonManager from '../TaxonManager/Local'

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

export class TaxonNameDropdownPickerSearch extends Component {
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
        <Modal onClose={onClose} open size="fullscreen">
          <Modal.Content>
            <TaxonManager
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Taxon"
              treeEnabled
            />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <TaxonDropdownSearch rightButton={picker} {...rest} />
  }
}

TaxonNameDropdownPickerSearch.propTypes = propTypes
TaxonNameDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({})(TaxonNameDropdownPickerSearch)
