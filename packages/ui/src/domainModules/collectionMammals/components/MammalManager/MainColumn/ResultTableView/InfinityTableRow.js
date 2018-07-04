import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'
import crudSelectors from 'coreModules/crud/globalSelectors'

const mapStateToProps = (state, { itemId }) => {
  const getOneSelector = crudSelectors.specimen.getOne
  const item = getOneSelector(state, itemId)
  return {
    item,
  }
}

const propTypes = {
  item: PropTypes.object,
}

const defaultProps = {
  item: undefined,
}

class InfinityTableRow extends Component {
  render() {
    const { item } = this.props

    if (!item) {
      return (
        <Table.Row>
          <Table.Cell>Loading</Table.Cell>
        </Table.Row>
      )
    }

    return (
      <Table.Row>
        <Table.Cell>
          {item.attributes.normalized.identifiers &&
            item.attributes.normalized.identifiers[0].value}
        </Table.Cell>
        <Table.Cell>
          {item.attributes.readOnly.objects.Scientific_Name}
        </Table.Cell>
        <Table.Cell>{item.attributes.readOnly.objects.Family}</Table.Cell>
        <Table.Cell>{item.attributes.readOnly.objects.Genus}</Table.Cell>
        <Table.Cell>{item.attributes.readOnly.objects.Species}</Table.Cell>
        <Table.Cell>
          {item.attributes.normalized.events[0].dateRange.startDate.dateText}
        </Table.Cell>
        <Table.Cell>
          {item.attributes.normalized.events[0].locationInformation.localityT}
        </Table.Cell>
        <Table.Cell>
          {item.attributes.readOnly.objects.WayOfDeath &&
            item.attributes.readOnly.objects.WayOfDeath_related.DödsorsakEN}
        </Table.Cell>
        <Table.Cell>{item.attributes.readOnly.analysis.Sex}</Table.Cell>
        <Table.Cell>{item.attributes.readOnly.analysis.AgeStage}</Table.Cell>
      </Table.Row>
    )
  }
}

InfinityTableRow.propTypes = propTypes
InfinityTableRow.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(InfinityTableRow)
