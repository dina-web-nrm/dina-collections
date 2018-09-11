import React, { PureComponent } from 'react'

import DropdownSearch from '../DropdownSearch'
import TogglableField from '../../TogglableField'

class TogglableDropdownSearch extends PureComponent {
  constructor(props) {
    super(props)
    this.renderInput = this.renderInput.bind(this)
  }

  renderInput(props) {
    return <DropdownSearch {...this.props} {...props} />
  }

  render() {
    return <TogglableField {...this.props} renderInput={this.renderInput} />
  }
}

export default TogglableDropdownSearch
