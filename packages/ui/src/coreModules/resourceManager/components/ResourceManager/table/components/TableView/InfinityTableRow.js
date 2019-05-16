import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Dimmer, Grid, Loader } from 'semantic-ui-react'
import objectPath from 'object-path'

import createLog from 'utilities/log'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { emToPixels } from 'coreModules/layout/utilities'

const log = createLog('resourceManager:TableView:InfinityTableRow')

const propTypes = {
  fetchItemById: PropTypes.func.isRequired,
  focusedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  onClickRow: PropTypes.func.isRequired,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired),
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  item: undefined,
  tableColumnsToShow: undefined,
}

const InfinityTableRow = ({
  fetchItemById,
  focusedIndex,
  index,
  itemId,
  item,
  onClickRow,
  tableColumnSpecifications,
  tableColumnsToShow,
  width,
}) => {
  log.render()
  if (itemId !== undefined) {
    fetchItemById(itemId)
  }

  const rowNumber = index + 1
  const isFocused = focusedIndex === index
  const background = isFocused // eslint-disable-line no-nested-ternary
    ? '#b5b5b5'
    : index % 2 === 0
    ? '#e5e7e9'
    : '#fff'

  if (!item) {
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
      data-isfocused={isFocused ? 'yes' : 'no'}
      data-testid={`infinityTableRow${rowNumber}`}
      onClick={event => {
        event.preventDefault()
        onClickRow(itemId)
      }}
      style={{ background, height: emToPixels(3.5), width }}
    >
      {tableColumnSpecifications.map(
        ({ buildText, fieldPath, label, width: columnWidth }) => {
          if (tableColumnsToShow.includes(fieldPath)) {
            let value = objectPath.get(item, `attributes.${fieldPath}`)

            const runBuildText =
              value && buildText && (Array.isArray(value) ? value.length : true)

            if (runBuildText) {
              value = buildText({ item, objectPath, value })
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

          return null
        }
      )}
    </Grid.Row>
  )
}

InfinityTableRow.propTypes = propTypes
InfinityTableRow.defaultProps = defaultProps

export default compose(createGetItemById({ shouldFetch: false }))(
  InfinityTableRow
)
