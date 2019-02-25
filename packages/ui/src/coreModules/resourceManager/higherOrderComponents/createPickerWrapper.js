import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blur, change } from 'redux-form'
import { Prompt } from 'react-router-dom'
import immutable from 'object-path-immutable'

import {
  ITEM_SELECT,
  PICKER_CLOSE,
  PICKER_PICK_ITEM,
} from 'coreModules/resourceManager/constants'

const defaultExtractPickedId = data => {
  return data && data.itemId
}

const propTypes = {
  blur: PropTypes.func.isRequired,
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
  blur,
  change,
}

const createPickerWrapper = ({
  extractPickedId = defaultExtractPickedId,
  pathToIdInValue = '',
  pathToTextInValue = '',
  requireEitherIdOrValue = false,
} = {}) => ComposedComponent => {
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
      if (type === ITEM_SELECT) {
        this.pickItem(data)
      }
    }

    pickItem(data) {
      const {
        input,
        meta,
        pathToIdInValue: pathToIdInValueOverride,
        pathToTextInValue: pathToTextInValueOverride,
      } = this.props

      const formName = meta && meta.form
      const itemId = extractPickedId(data)
      // use nestedItem for custom id extraction
      if (itemId !== undefined) {
        const idPath = pathToIdInValueOverride || pathToIdInValue
        const textPath = pathToTextInValueOverride || pathToTextInValue
        const isObjectValue = !!(idPath || textPath)

        const baseValue = requireEitherIdOrValue
          ? immutable.del(input.value, textPath)
          : input.value

        const value = isObjectValue
          ? immutable.set(baseValue, idPath, itemId)
          : itemId

        if (input.onChange) {
          input.onChange(value)
        } else {
          this.props.change(formName, input.name, value)
        }

        if (input.onBlur) {
          input.onBlur(value)
        } else {
          this.props.blur(formName, input.name, value)
        }
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
      // Set timeout to prevent picker open event from closing the modal
      // Only an issue with modal in modal
      setTimeout(() => {
        this.setPickerActive()
      })
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
        <React.Fragment>
          <Prompt
            message={() => {
              // first block transition then close
              setTimeout(this.handleOnClose)
              return false
            }}
            when={pickerActive}
          />
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
        </React.Fragment>
      )
    }
  }

  PickerWrapper.propTypes = propTypes
  PickerWrapper.defaultProps = defaultProps

  return connect(
    null,
    mapDispatchToProps
  )(PickerWrapper)
}

export default createPickerWrapper
