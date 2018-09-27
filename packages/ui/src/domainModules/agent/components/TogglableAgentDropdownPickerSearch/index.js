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

    this.renderInput = this.renderInput.bind(this)
    this.renderResult = this.renderResult.bind(this)
    this.removeForceRenderResult = this.removeForceRenderResult.bind(this)
    this.reportPickerActive = this.reportPickerActive.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // forceRenderResult if value was selected (triggers only if this
    // isLatestActiveField)
    if (
      this.props.input.value !== nextProps.input.value &&
      (nextProps.input.value &&
        (nextProps.input.value.textI || nextProps.input.value.normalized))
    ) {
      this.setState({ forceRenderResult: true })
    }
  }

  reportPickerActive(value) {
    // if picker active, prepare to forceRenderResult when picker is no longer
    // active and value was selected
    if (value) {
      return this.setState({
        forceRenderResult: true,
        pickerActive: true,
      })
    }

    return this.setState({
      pickerActive: false,
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
    const { input: { value } } = this.props

    return (
      <TogglableField
        {...this.props}
        forceRenderResult={!pickerActive && !!value && forceRenderResult}
        getHasValue={getHasValue}
        renderInput={this.renderInput}
        renderResult={this.renderResult}
      />
    )
  }
}

TogglableAgentDropdownPickerSearch.propTypes = propTypes

export default TogglableAgentDropdownPickerSearch
