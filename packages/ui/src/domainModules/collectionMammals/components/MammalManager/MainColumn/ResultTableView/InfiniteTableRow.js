import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'

import { emToPixels } from 'coreModules/layout/utilities'
import crudSelectors from 'coreModules/crud/globalSelectors'

import tableColumnSpecifications from '../tableColumnSpecifications'

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
  itemId,
  // language, // TODO implement translations
  onClick,
  rowNumber,
  tableColumnsToShow,
  width,
}) => {
  if (!item) {
    return (
      <Grid.Row
        data-testid={`InfiniteTableRow-${rowNumber}-loading`}
        style={{ height: emToPixels(3.5), width }}
      >
        <Grid.Column style={{ width: 60 }}>
          <Dimmer active inverted>
            <Loader inverted size="mini" />
          </Dimmer>
        </Grid.Column>
      </Grid.Row>
    )
  }

  return (
    <Grid.Row
      data-testid={`InfiniteTableRow-${rowNumber}`}
      onClick={event => {
        event.preventDefault()
        onClick(rowNumber, itemId)
      }}
      style={{ background, cursor: 'pointer', height: emToPixels(3.5), width }}
    >
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
