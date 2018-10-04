import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import TaxonNameDropdownSearch from '../TaxonNameDropdownSearch'
import TaxonManager from '../TaxonManager/Local'

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

export class TaxonNameDropdownPickerSearch extends Component {
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
        <Modal onClose={onClose} open>
          <Modal.Content>
            <TaxonManager isPicker onInteraction={onInteraction} treeEnabled />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <TaxonNameDropdownSearch rightButton={picker} {...rest} />
  }
}

TaxonNameDropdownPickerSearch.propTypes = propTypes

export default createPickerWrapper({ extractPickedId })(
  TaxonNameDropdownPickerSearch
)
