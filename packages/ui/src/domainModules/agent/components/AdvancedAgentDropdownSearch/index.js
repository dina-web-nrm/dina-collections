import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import { change } from 'redux-form'

import { CollectionBlock, ItemBlock } from 'coreModules/crudBlocks/components'
import {
  CREATE,
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
  INSPECT,
  ITEM_CLICK,
  LIST,
  SET_COLLECTION,
  SET_COLLECTION_LIST,
  SET_ITEM_CREATE,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import { DROPDOWN_FILTER_OPTIONS } from '../../constants'
import CreateForm from '../item/form/Create'
import InspectView from '../item/Inspect'
import AgentList from '../collection/AgentList'
import AgentDropdownSearch from '../AgentDropdownSearch'

const NAME = 'agentPicker'

const mapDispatchToProps = {
  change,
}

const propTypes = {
  change: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    form: PropTypes.string.isRequired,
  }).isRequired,
}

export class AdvancedAgentDropdownSearch extends Component {
  static renderCreateForm(props) {
    return <CreateForm {...props} />
  }

  static renderInspectView(props) {
    return <InspectView {...props} />
  }

  static renderList(props) {
    return <AgentList {...props} />
  }

  constructor(props) {
    super(props)
    this.state = {
      collectionBlockType: LIST,
      createActive: false,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: false,
    }
    this.handleInteraction = this.handleInteraction.bind(this)
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this)
    this.setCreateActive = this.setCreateActive.bind(this)
    this.setInspectActive = this.setInspectActive.bind(this)
    this.setPickerActive = this.setPickerActive.bind(this)
  }

  setCreateActive() {
    this.setState({
      createActive: true,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: false,
    })
  }

  setInspectActive(itemId) {
    this.setState({
      createActive: false,
      inspectActive: true,
      inspectItemId: itemId,
      pickerActive: false,
    })
  }

  setPickerActive() {
    this.setState({
      createActive: false,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: true,
    })
  }

  handleOnClose(event) {
    // this is to fix bug with event bubbling up unexpectedly, causing modal to
    // close even when it should not
    if (
      event &&
      event.path &&
      event.path[0] &&
      (!event.path[0].className || !event.path[0].className.includes('modals'))
    ) {
      return
    }

    this.setState({
      createActive: false,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: false,
    })
  }

  handlePickerButtonClick(event) {
    event.preventDefault()
    this.setPickerActive()
  }

  handleInteraction(type, data = {}) {
    const { meta: { form }, input: { name } } = this.props
    if (type === FORM_CREATE_SUCCESS || type === ITEM_CLICK) {
      this.props.change(form, name, data.itemId)
    }

    if (type === SET_ITEM_CREATE) {
      return this.setCreateActive()
    }

    if (type === SET_ITEM_INSPECT) {
      const { itemId } = data
      return this.setInspectActive(itemId)
    }

    if (type === FORM_CANCEL) {
      return this.setPickerActive()
    }

    if (type === SET_COLLECTION) {
      return this.setPickerActive()
    }

    if (type === SET_COLLECTION_LIST) {
      return this.setState({
        collectionBlockType: LIST,
      })
    }

    return this.handleOnClose()
  }

  render() {
    const {
      collectionBlockType,
      createActive,
      inspectActive,
      inspectItemId,
      pickerActive,
    } = this.state

    const picker = (
      <Button onClick={this.handlePickerButtonClick}>Picker</Button>
    )

    if (createActive || inspectActive) {
      const itemId = (inspectActive && inspectItemId) || undefined

      return (
        <Modal onClose={this.handleOnClose} open>
          <Modal.Content>
            <ItemBlock
              disableEdit
              itemBlockType={inspectActive ? INSPECT : CREATE}
              itemId={itemId}
              layoutMode="modal"
              name={NAME}
              onInteraction={this.handleInteraction}
              renderCreateForm={AdvancedAgentDropdownSearch.renderCreateForm}
              renderInspectView={AdvancedAgentDropdownSearch.renderInspectView}
            />
          </Modal.Content>
        </Modal>
      )
    }

    if (pickerActive) {
      return (
        <Modal onClose={this.handleOnClose} open>
          <Modal.Content>
            <CollectionBlock
              collectionBlockType={collectionBlockType}
              disableEdit
              dropdownFilterOptions={DROPDOWN_FILTER_OPTIONS}
              layoutMode="modal"
              name={NAME}
              onInteraction={this.handleInteraction}
              renderList={AdvancedAgentDropdownSearch.renderList}
            />
          </Modal.Content>
        </Modal>
      )
    }

    return <AgentDropdownSearch rightButton={picker} {...this.props} />
  }
}

AdvancedAgentDropdownSearch.propTypes = propTypes

export default connect(null, mapDispatchToProps)(AdvancedAgentDropdownSearch)
