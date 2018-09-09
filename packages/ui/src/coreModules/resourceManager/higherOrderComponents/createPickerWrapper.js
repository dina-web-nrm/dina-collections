import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import immutable from 'object-path-immutable'

import {
  PICKER_CLOSE,
  PICKER_PICK_ITEM,
} from 'coreModules/resourceManager/constants'

const defaultExtractPickedId = data => {
  return data && data.itemId
}

const propTypes = {
  change: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  pathToIdInValue: PropTypes.string,
  pathToTextInValue: PropTypes.string,
}
const defaultProps = {
  pathToIdInValue: '',
  pathToTextInValue: '',
}

const mapDispatchToProps = {
  change,
}

const createPickerWrapper = (
  {
    extractPickedId = defaultExtractPickedId,
    pathToIdInValue = '',
    pathToTextInValue = '',
  } = {}
) => ComposedComponent => {
  class PickerWrapper extends Component {
    constructor(props) {
      super(props)

      this.handleInteraction = this.handleInteraction.bind(this)
      this.handleOnClose = this.handleOnClose.bind(this)
      this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this)
      this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
      this.setPickerActive = this.setPickerActive.bind(this)
      this.pickItem = this.pickItem.bind(this)

      this.state = {
        pickerActive: false,
      }
    }

    setPickerActive() {
      this.setState({
        pickerActive: true,
      })
    }

    handleInteraction(type, data) {
      if (type === PICKER_CLOSE) {
        this.handleOnClose()
      }

      if (type === PICKER_PICK_ITEM) {
        this.pickItem(data)
      }
    }

    pickItem(data) {
      const {
        input,
        meta,
        pathToIdInValue: pathToIdInValueOverride,
      } = this.props
      const formName = meta && meta.form
      const itemId = extractPickedId(data)
      // use nestedItem for custom id extraction
      if (itemId !== undefined) {
        this.props.change(
          formName,
          input.name,
          pathToIdInValue
            ? immutable.set(
                input.value,
                pathToIdInValueOverride || pathToIdInValue,
                itemId
              )
            : itemId
        )
      }
      this.handleOnClose()
    }

    handleSearchQueryChange({ searchQuery }) {
      // not setting in state should not update component
      this.searchQuery = searchQuery
    }

    handleOnClose(event) {
      if (event) {
        event.preventDefault()
      }
      this.searchQuery = undefined
      this.setState({
        pickerActive: false,
      })
    }

    handlePickerButtonClick(event) {
      event.preventDefault()
      this.setPickerActive()
    }

    render() {
      const {
        handleInteraction,
        handleOnClose,
        handlePickerButtonClick,
        handleSearchQueryChange,
        searchQuery,
        setPickerActive,
      } = this

      const {
        input,
        meta,
        pathToIdInValue: pathToIdInValueOverride,
        pathToTextInValue: pathToTextInValueOverride,
      } = this.props

      const { pickerActive } = this.state
      const formName = meta && meta.form
      const value = input && input.value

      return (
        <ComposedComponent
          {...this.props}
          fieldSearchQuery={searchQuery}
          fieldValue={value}
          formName={formName}
          onClose={handleOnClose}
          onInteraction={handleInteraction}
          onPickerButtonClick={handlePickerButtonClick}
          onSearchQueryChange={handleSearchQueryChange}
          pathToIdInValue={pathToIdInValueOverride || pathToIdInValue}
          pathToTextInValue={pathToTextInValueOverride || pathToTextInValue}
          pickerActive={pickerActive}
          setPickerActive={setPickerActive}
        />
      )
    }
  }

  PickerWrapper.propTypes = propTypes
  PickerWrapper.defaultProps = defaultProps

  return connect(null, mapDispatchToProps)(PickerWrapper)
}

export default createPickerWrapper
