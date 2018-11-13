import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { TogglableField } from 'coreModules/form/components'
import AgentDropdownPickerSearch from '../AgentDropdownPickerSearch'
import AgentIdTextResult from '../AgentIdTextResult'

const getHasValue = input => {
  return input && input.value && (input.value.textI || input.value.normalized)
}

const propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        normalized: PropTypes.shape({
          id: PropTypes.string.isRequired,
        }),
        textI: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  }).isRequired,
}

class TogglableAgentDropdownPickerSearch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      forceRenderResult: false,
      pickerActive: false,
    }

    this.onBlur = this.onBlur.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.renderResult = this.renderResult.bind(this)
    this.removeForceRenderResult = this.removeForceRenderResult.bind(this)
    this.reportPickerActive = this.reportPickerActive.bind(this)
  }

  onBlur(value) {
    if (value && (value.textI || value.normalized)) {
      this.setState({ forceRenderResult: true })
    }
    this.props.input.onBlur(value)
  }

  reportPickerActive(pickerActive) {
    // if picker active, prepare to forceRenderResult when picker is no longer
    // active and value was selected
    const { value } = this.props.input

    if (
      pickerActive &&
      value &&
      (value.textI || (value.normalized && value.normalized.id))
    ) {
      return this.setState({
        forceRenderResult: true,
        pickerActive: true,
      })
    }

    return this.setState({
      pickerActive,
    })
  }

  removeForceRenderResult() {
    // this is called when edit button is clicked or field is no longer latest
    // active
    this.setState({ forceRenderResult: false })
  }

  /* eslint-disable class-methods-use-this */
  renderInput(props) {
    return (
      <AgentDropdownPickerSearch
        {...props}
        focusOnMount
        reportPickerActive={this.reportPickerActive}
      />
    )
  }

  renderResult(props) {
    const { forceRenderResult, isLatestActiveField } = props

    return (
      <AgentIdTextResult
        displayLabel={false}
        {...props}
        focusOnMount={isLatestActiveField && forceRenderResult}
        removeForceRenderResult={this.removeForceRenderResult}
      />
    )
  }
  /* eslint-enable class-methods-use-this */

  render() {
    const { forceRenderResult, pickerActive } = this.state
    const { input } = this.props

    return (
      <TogglableField
        {...this.props}
        forceRenderResult={!pickerActive && !!input.value && forceRenderResult}
        getHasValue={getHasValue}
        input={{
          ...input,
          onBlur: this.onBlur,
        }}
        renderInput={this.renderInput}
        renderResult={this.renderResult}
      />
    )
  }
}

TogglableAgentDropdownPickerSearch.propTypes = propTypes

export default TogglableAgentDropdownPickerSearch
