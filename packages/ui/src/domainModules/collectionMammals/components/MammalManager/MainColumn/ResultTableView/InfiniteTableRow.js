import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import tableColumnSpecifications from '../tableColumnSpecifications'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTableRow'
)

const propTypes = {
  background: PropTypes.string.isRequired,
  item: PropTypes.object,
  language: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  rowNumber: PropTypes.number.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  item: undefined,
}

const InfiniteTableRow = ({
  background,
  item,
  language,
  onClick,
  rowNumber,
  tableColumnsToShow,
  width,
}) => {
  log.render()

  if (true && !item) {
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
      {tableColumnSpecifications.map(
        ({ name, selector, width: columnWidth }) => {
          if (tableColumnsToShow.includes(name)) {
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
                {selector(item, language)}
              </Grid.Column>
            )
          }

          return null
        }
      )}
    </Grid.Row>
  )
}

InfiniteTableRow.propTypes = propTypes
InfiniteTableRow.defaultProps = defaultProps

export default createGetNestedItemById({
  include: [
    'agents',
    'causeOfDeathTypes',
    'establishmentMeansTypes',
    'featureTypes',
    'identifierTypes',
    'physicalObjects.storageLocation.parent',
    'places',
    'preparationTypes',
    'taxonNames',
    'typeSpecimenType',
  ],
  nestedItemKey: 'item',
  relationships: ['all'],
  resolveRelationships: [
    'agent',
    'causeOfDeathType',
    'establishmentMeansType',
    'featureType',
    'identifierType',
    'physicalObject',
    'place',
    'preparationType',
    'storageLocation',
    'taxonName',
    'typeSpecimenType',
  ],
  resource: 'specimen',
})(InfiniteTableRow)
