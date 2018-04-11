import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import { change } from 'redux-form'

import {
  CollectionBlock,
  CreateBlock,
  InspectBlock,
} from 'coreModules/crudBlocks/components'
import {
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
  ITEM_CLICK,
  SET_COLLECTION,
  SET_COLLECTION_LIST,
  SET_COLLECTION_TREE,
  SET_ITEM_CREATE,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'
import LocalityDropdownSearch from '../LocalityDropdownSearch'

const mapDispatchToProps = {
  change,
}

const propTypes = {
  change: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
}

export class AdvancedLocalityDropdownSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collectionBlockType: 'list',
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
      pickerActive: true,
    })
  }

  handleOnClose() {
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
    const { formName, input: { name } } = this.props
    if (type === FORM_CREATE_SUCCESS || type === ITEM_CLICK) {
      this.props.change(formName, name, data.itemId)
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
        collectionBlockType: 'list',
      })
    }

    if (type === SET_COLLECTION_TREE) {
      return this.setState({
        collectionBlockType: 'tree',
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
    const { ...rest } = this.props
    const picker = (
      <Button onClick={this.handlePickerButtonClick}>Picker</Button>
    )

    if (createActive) {
      return (
        <Modal onClose={this.handleOnClose} open>
          <Modal.Content>
            <CreateBlock
              disableEdit
              itemBlockType="create"
              layoutMode="modal"
              onInteraction={this.handleInteraction}
            />
          </Modal.Content>
        </Modal>
      )
    }

    if (inspectActive) {
      return (
        <Modal onClose={this.handleOnClose} open>
          <Modal.Content>
            <InspectBlock
              disableEdit
              itemBlockType="inspect"
              itemId={inspectItemId}
              layoutMode="modal"
              onInteraction={this.handleInteraction}
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
              layoutMode="modal"
              onInteraction={this.handleInteraction}
            />
          </Modal.Content>
        </Modal>
      )
    }

    return <LocalityDropdownSearch rightButton={picker} {...rest} />
  }
}

AdvancedLocalityDropdownSearch.propTypes = propTypes

export default connect(null, mapDispatchToProps)(AdvancedLocalityDropdownSearch)
