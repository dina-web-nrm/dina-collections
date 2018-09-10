import React, { PureComponent } from 'react'

import { TogglableField } from 'coreModules/form/components'
import AgentDropdownPickerSearch from '../AgentDropdownPickerSearch'
import AgentIdTextResult from './AgentIdTextResult'

class TogglableAgentDropdownPickerSearch extends PureComponent {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
    this.renderResult = this.renderResult.bind(this)
  }

  /* eslint-disable class-methods-use-this */
  renderInput(props) {
    return <AgentDropdownPickerSearch {...props} />
  }

  renderResult(props) {
    return <AgentIdTextResult {...props} />
  }
  /* eslint-enable class-methods-use-this */

  render() {
    return (
      <TogglableField
        {...this.props}
        renderInput={this.renderInput}
        renderResult={this.renderResult}
      />
    )
  }
}

export default TogglableAgentDropdownPickerSearch
