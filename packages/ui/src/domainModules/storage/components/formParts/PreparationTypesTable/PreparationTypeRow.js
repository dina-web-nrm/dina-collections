import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { Icon, Table } from 'semantic-ui-react'

const propTypes = {
  disconnectPreparationType: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
}
const defaultProps = {
  item: undefined,
}

class PreparationTypeRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    this.props.disconnectPreparationType(this.props.index)
  }

  render() {
    const { item } = this.props

    const { attributes: { name } = {} } = item || {}

    return (
      <Table.Row>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>
          <Icon
            name="trash"
            onClick={this.handleDisconnect}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

PreparationTypeRow.propTypes = propTypes
PreparationTypeRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'preparationType',
  })
)(PreparationTypeRow)
