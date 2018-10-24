import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import PreparationTypeDropdownSearch from 'domainModules/curatedList/components/PreparationTypeDropdownSearch'

const propTypes = {
  addPreparationType: PropTypes.func.isRequired,
}

export class NewPreparationTypeRow extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(itemId) {
    this.props.addPreparationType(itemId)
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <PreparationTypeDropdownSearch
            displayLabel={false}
            enableHelpNotification={false}
            input={{
              name: 'newPreparationType',
              onBlur: this.handleChange,
              onChange: this.handleChange,
            }}
            meta={{}}
            module="curatedList"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

NewPreparationTypeRow.propTypes = propTypes

export default compose()(NewPreparationTypeRow)
