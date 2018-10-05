import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { TogglableField } from 'coreModules/form/components'
import AcceptedTaxonNameDropdownPickerSearch from '../AcceptedTaxonNameDropdownPickerSearch'
import TaxonNameResult from '../TaxonNameResult'

const propTypes = {
  input: PropTypes.shape({
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
}

class TogglableAcceptedTaxonNameDropdownPickerSearch extends PureComponent {
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
    if (value) {
      this.setState({ forceRenderResult: true })
    }
    this.props.input.onBlur(value)
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
      <AcceptedTaxonNameDropdownPickerSearch
        {...props}
        reportPickerActive={this.reportPickerActive}
      />
    )
  }

  renderResult(props) {
    const { forceRenderResult, isLatestActiveField } = props

    return (
      <TaxonNameResult
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
        input={{
          ...input,
          onBlur: this.onBlur,
        }}
        renderEmptyState={this.renderInput /* skipping empty state */}
        renderInput={this.renderInput}
        renderResult={this.renderResult}
      />
    )
  }
}

TogglableAcceptedTaxonNameDropdownPickerSearch.propTypes = propTypes

export default TogglableAcceptedTaxonNameDropdownPickerSearch
