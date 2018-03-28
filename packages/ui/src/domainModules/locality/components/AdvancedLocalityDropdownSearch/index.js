import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'
import CreateBlock from 'domainModules/locality/components/LocalityManager/blocks/Item/Create'
import CollectionBlock from 'domainModules/locality/components/LocalityManager/blocks/Collection'
import { change } from 'redux-form'
import {
  FORM_CREATE_SUCCESS,
  SET_COLLECTION_LIST,
  SET_COLLECTION_TREE,
  SET_ITEM_INSPECT,
} from 'domainModules/locality/interactions'

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
      pickerActive: false,
    }
    this.handleOnClose = this.handleOnClose.bind(this)
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this)
    this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this)
    this.handleInteraction = this.handleInteraction.bind(this)
  }

  handleOnClose() {
    this.setState({
      createActive: false,
      pickerActive: false,
    })
  }

  handleCreateButtonClick(event) {
    event.preventDefault()
    this.setState({
      createActive: true,
      pickerActive: false,
    })
  }

  handlePickerButtonClick(event) {
    event.preventDefault()
    this.setState({
      createActive: false,
      pickerActive: true,
    })
  }

  handleInteraction(type, data) {
    const { formName, input: { name } } = this.props
    if (type === FORM_CREATE_SUCCESS) {
      this.props.change(formName, name, data.itemId)
    }

    if (type === SET_ITEM_INSPECT) {
      this.props.change(formName, name, data.itemId)
    }

    if (type === SET_COLLECTION_LIST) {
      this.setState({
        collectionBlockType: 'list',
      })
    }

    if (type === SET_COLLECTION_TREE) {
      this.setState({
        collectionBlockType: 'tree',
      })
    }

    this.handleOnClose()
  }

  render() {
    const { collectionBlockType, createActive, pickerActive } = this.state
    const { ...rest } = this.props
    const picker = (
      <Button onClick={this.handlePickerButtonClick}>Picker</Button>
    )
    const create = <Button onClick={this.handleCreateButtonClick}>New</Button>

    if (createActive) {
      return (
        <Modal onClose={this.handleOnClose} open>
          <Modal.Content>
            <CreateBlock
              displayNavigationButtons={false}
              itemBlockType="create"
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
              displayNavigationButtons={false}
              layoutMode="modal"
              onInteraction={this.handleInteraction}
            />
          </Modal.Content>
        </Modal>
      )
    }

    return (
      <LocalityDropdownSearch
        leftButton={picker}
        rightButton={create}
        {...rest}
      />
    )
  }
}

AdvancedLocalityDropdownSearch.propTypes = propTypes

export default connect(null, mapDispatchToProps)(AdvancedLocalityDropdownSearch)
