import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import objectPath from 'object-path'

import createLog from 'utilities/log'
import crudSelectors from 'coreModules/crud/globalSelectors'

import tableColumnSpecifications from '../tableColumnSpecifications'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTableRow'
)

const mapStateToProps = (state, { itemId, resource }) => {
  return {
    item: itemId && crudSelectors[resource].getOne(state, itemId),
  }
}

const propTypes = {
  background: PropTypes.string.isRequired,
  item: PropTypes.object,
  itemId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  // language: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rowNumber: PropTypes.number.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  item: undefined,
  itemId: undefined,
}

const InfiniteTableRow = ({
  background,
  item,
  // language, // TODO implement translations
  onClick,
  rowNumber,
  tableColumnsToShow,
  width,
}) => {
  log.render()

  if (!item) {
    return (
      <Grid.Row style={{ height: 43, width }}>
        <Grid.Column>Loading...</Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid.Row
      onClick={event => {
        event.preventDefault()
        onClick(item.id)
      }}
      style={{ background, height: 43, width }}
    >
      <Grid.Column key="rowNumber" style={{ width: 80 }} textAlign="right">
        {rowNumber}
      </Grid.Column>
      {tableColumnSpecifications.map(({ name, width: columnWidth }) => {
        if (tableColumnsToShow.includes(name)) {
          let value = objectPath.get(item, `attributes.${name}`)

          if (Array.isArray(value)) {
            value = value.join('; ')
          }

          return (
            <Grid.Column
              key={name}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: columnWidth,
              }}
            >
              {value}
            </Grid.Column>
          )
        }

        return null
      })}
    </Grid.Row>
  )
}

InfiniteTableRow.propTypes = propTypes
InfiniteTableRow.defaultProps = defaultProps

export default connect(mapStateToProps)(InfiniteTableRow)
