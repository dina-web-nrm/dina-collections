import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { LayerModal } from 'coreModules/commonUi/components'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'

let TaxonNameManager = null

export function setLocalManager(InjectedTaxonNameManager) {
  TaxonNameManager = InjectedTaxonNameManager
}

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
        <LayerModal onClose={onClose} open style={{ overflow: 'hidden' }}>
          <Modal.Content>
            <TaxonNameManager
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Taxon name"
              treeEnabled={false}
            />
          </Modal.Content>
        </LayerModal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <TaxonNameDropdownSearch rightButton={picker} {...rest} />
  }
}

TaxonNameDropdownPickerSearch.propTypes = propTypes
TaxonNameDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({})(TaxonNameDropdownPickerSearch)
