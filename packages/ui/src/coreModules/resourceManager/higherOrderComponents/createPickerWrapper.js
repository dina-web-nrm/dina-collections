import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { blur, change } from 'redux-form'
import { Prompt } from 'react-router-dom'
import immutable from 'object-path-immutable'

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

      this.handleOnClose = this.handleOnClose.bind(this)
      this.handlePickItem = this.handlePickItem.bind(this)
      this.handlePickerButtonClick = this.handlePickerButtonClick.bind(this)
      this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this)
      this.setPickerActive = this.setPickerActive.bind(this)

      this.state = {
        pickerActive: false,
      }
    }

    setPickerActive() {
      this.setState({
        pickerActive: true,
      })
    }

    handlePickItem(data) {
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
            fieldSearchQuery={this.searchQuery}
            fieldValue={value}
            formName={formName}
            onClose={this.handleOnClose}
            onPickerButtonClick={this.handlePickerButtonClick}
            onPickItem={this.handlePickItem}
            onSearchQueryChange={this.handleSearchQueryChange}
            pathToIdInValue={pathToIdInValueOverride || pathToIdInValue}
            pathToTextInValue={pathToTextInValueOverride || pathToTextInValue}
            pickerActive={pickerActive}
            setPickerActive={this.setPickerActive}
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
