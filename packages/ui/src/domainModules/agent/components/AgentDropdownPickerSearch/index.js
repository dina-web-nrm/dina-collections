import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'semantic-ui-react'
import { createPickerWrapper } from 'coreModules/resourceManager/higherOrderComponents'

import AgentDropdownSearch from '../AgentDropdownSearch'
import AgentManager from '../AgentManager/Local'

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

export class AgentDropdownPickerSearch extends Component {
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
            fullName: fieldSearchQuery,
          }
        : undefined
      return (
        <Modal onClose={onClose} open size="fullscreen">
          <Modal.Content>
            <AgentManager
              initialFilterValues={initialFilterValues}
              initialItemId={fieldValue}
              isPicker
              onInteraction={onInteraction}
              pickerTitle="Pick Agent"
              treeEnabled={false}
            />
          </Modal.Content>
        </Modal>
      )
    }

    const picker = <Button onClick={onPickerButtonClick}>Picker</Button>

    return <AgentDropdownSearch rightButton={picker} {...rest} />
  }
}

AgentDropdownPickerSearch.propTypes = propTypes
AgentDropdownPickerSearch.defaultProps = defaultProps

export default createPickerWrapper({})(AgentDropdownPickerSearch)
