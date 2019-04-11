import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal } from 'semantic-ui-react'
import { LayerModal } from 'coreModules/commonUi/components'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'

let TaxonManager = null

export function setLocalManager(InjectedTaxonManager) {
  TaxonManager = InjectedTaxonManager
}

const propTypes = {
  onClose: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onPickerButtonClick: PropTypes.func.isRequired,
  pickerActive: PropTypes.bool.isRequired,
}

const extractPickedId = data => {
  return (
    data &&
    data.nestedItem &&
    data.nestedItem.acceptedTaxonName &&
    data.nestedItem.acceptedTaxonName.id
  )
}

export class AcceptedTaxonNameDropdownPickerSearch extends Component {
  render() {
    const {
      onClose,
      onInteraction,
      onPickerButtonClick,
      pickerActive,
      ...rest
    } = this.props
    if (pickerActive) {
      return (
        <LayerModal onClose={onClose} open style={{ overflow: 'hidden' }}>
          <Modal.Content>
            <TaxonManager isPicker onInteraction={onInteraction} treeEnabled />
          </Modal.Content>
        </LayerModal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <TaxonNameDropdownSearch rightButton={picker} {...rest} />
  }
}

AcceptedTaxonNameDropdownPickerSearch.propTypes = propTypes

export default createPickerWrapper({ extractPickedId })(
  AcceptedTaxonNameDropdownPickerSearch
)
