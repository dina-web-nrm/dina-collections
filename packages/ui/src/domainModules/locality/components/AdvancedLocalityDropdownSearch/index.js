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
  SET_COLLECTION_TREE,
  SET_ITEM_CREATE,
  SET_ITEM_CREATE_CHILD,
  SET_ITEM_INSPECT,
  TREE,
} from 'coreModules/crudBlocks/constants'
import globalSelectors from '../../globalSelectors'
import CreateForm from '../item/form/Create'
import InspectView from '../item/Inspect'
import LocalityList from '../collection/LocalityList'
import LocalityTree from '../collection/LocalityTree'
import LocalityDropdownSearch from '../LocalityDropdownSearch'

const NAME = 'localityPicker'

const mapDispatchToProps = {
  change,
}

const propTypes = {
  change: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
}

export class AdvancedLocalityDropdownSearch extends Component {
  static renderCreateForm(props) {
    return <CreateForm {...props} />
  }

  static renderInspectView(props) {
    return <InspectView {...props} />
  }

  static renderList(props) {
    return <LocalityList {...props} />
  }

  static renderTree(props) {
    return <LocalityTree {...props} />
  }

  constructor(props) {
    super(props)
    this.state = {
      collectionBlockType: LIST,
      createActive: false,
      createChildToParentId: undefined,
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

  setCreateActive(parentId) {
    this.setState({
      createActive: true,
      createChildToParentId: parentId,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: false,
    })
  }

  setInspectActive(itemId) {
    this.setState({
      createActive: false,
      createChildToParentId: undefined,
      inspectActive: true,
      inspectItemId: itemId,
      pickerActive: false,
    })
  }

  setPickerActive() {
    this.setState({
      createActive: false,
      createChildToParentId: undefined,
      inspectActive: false,
      inspectItemId: undefined,
      pickerActive: true,
    })
  }

  handleOnClose() {
    this.setState({
      createActive: false,
      createChildToParentId: undefined,
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

    if (type === SET_ITEM_CREATE || type === SET_ITEM_CREATE_CHILD) {
      const { itemId } = data
      return this.setCreateActive(itemId)
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

    if (type === SET_COLLECTION_TREE) {
      return this.setState({
        collectionBlockType: TREE,
      })
    }

    return this.handleOnClose()
  }

  render() {
    const {
      collectionBlockType,
      createActive,
      createChildToParentId,
      inspectActive,
      inspectItemId,
      pickerActive,
    } = this.state
    const { ...rest } = this.props
    const picker = (
      <Button onClick={this.handlePickerButtonClick}>Picker</Button>
    )

    if (createActive || inspectActive) {
      const itemId =
        (inspectActive && inspectItemId) ||
        (createActive && createChildToParentId)

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
              renderCreateForm={AdvancedLocalityDropdownSearch.renderCreateForm}
              renderInspectView={
                AdvancedLocalityDropdownSearch.renderInspectView
              }
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
              getAncestorsByParentId={globalSelectors.getPlaceAncestorsById}
              layoutMode="modal"
              name={NAME}
              onInteraction={this.handleInteraction}
              renderList={AdvancedLocalityDropdownSearch.renderList}
              renderTree={AdvancedLocalityDropdownSearch.renderTree}
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
