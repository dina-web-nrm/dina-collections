import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'

const propTypes = {
  background: PropTypes.string.isRequired,
  itemId: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  nestedItem: PropTypes.object,
  onClickRow: PropTypes.func.isRequired,
  rowNumber: PropTypes.number.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  itemId: undefined,
  nestedItem: undefined,
}

const InfiniteTableRow = ({
  background,
  itemId,
  nestedItem,
  onClickRow,
  rowNumber,
  tableColumnSpecifications,
  width,
}) => {
  if (!nestedItem) {
    return (
      <Grid.Row style={{ height: emToPixels(3.5), width }}>
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
      onClick={event => {
        event.preventDefault()
        onClickRow(rowNumber, itemId)
      }}
      style={{ background, height: emToPixels(3.5), width }}
    >
      {tableColumnSpecifications.map(
        ({ buildText, fieldPath, label, width: columnWidth }) => {
          let value = objectPath.get(nestedItem, fieldPath)

          const runBuildText =
            value && buildText && (Array.isArray(value) ? value.length : true)

          if (runBuildText) {
            value = buildText({ nestedItem, objectPath, value })
          }

          if (Array.isArray(value)) {
            value = value.join('; ')
          }

          return (
            <Grid.Column
              key={fieldPath || label}
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
      )}
    </Grid.Row>
  )
}

InfiniteTableRow.propTypes = propTypes
InfiniteTableRow.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    refresh: false,
    shouldFetch: false,
  })
)(InfiniteTableRow)
