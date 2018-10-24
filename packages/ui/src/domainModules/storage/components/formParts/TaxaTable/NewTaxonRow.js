import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import TaxonDropdownSearch from 'domainModules/taxon/components/TaxonDropdownSearch'

const propTypes = {
  addName: PropTypes.func.isRequired,
}

export class NewTaxonNameRow extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(itemId) {
    this.props.addName(itemId)
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <TaxonDropdownSearch
            displayLabel={false}
            enableHelpNotification={false}
            input={{
              name: 'newTaxonName',
              onBlur: this.handleChange,
              onChange: this.handleChange,
            }}
            meta={{}}
            module="taxon"
            taxonNameType="scientific"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

NewTaxonNameRow.propTypes = propTypes

export default compose()(NewTaxonNameRow)
