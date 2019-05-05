import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'
import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'

const propTypes = {
  enableTableColumnSorting: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  onSaveTableColumnsToSort: PropTypes.func.isRequired,
  scrollLeft: PropTypes.number,
  tableColumnSpecifications: PropTypes.array.isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableColumnsToSort: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  topOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  scrollLeft: 0,
}

class InfinityTableHeader extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClickSorting = this.handleClickSorting.bind(this)
  }

  handleClickSorting(event, fieldPath, newSortOrder) {
    if (event) {
      event.preventDefault()
    }

    // currently only supporting sorting on one column at the time
    return this.props.onSaveTableColumnsToSort([
      { fieldPath, sort: newSortOrder },
    ])
  }

  renderColumnHeader({ fieldPath, label, width }) {
    const { enableTableColumnSorting, tableColumnsToSort } = this.props

    if (enableTableColumnSorting && tableColumnsToSort) {
      const sortedColumn = tableColumnsToSort.find(
        column => column.fieldPath === fieldPath
      )

      if (sortedColumn) {
        const currentSortOrder = sortedColumn.sort
        const newSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc'
        const iconName = currentSortOrder === 'asc' ? 'caret down' : 'caret up'

        return (
          <Grid.Column key={fieldPath} style={{ width }}>
            <Header
              data-testid={`infinityTableHeader-${fieldPath}`}
              onClick={event =>
                this.handleClickSorting(event, fieldPath, newSortOrder)
              }
              size="small"
            >
              <Header.Content>
                <Translate capitalize textKey={label} />
                <Icon name={iconName} />
              </Header.Content>
            </Header>
          </Grid.Column>
        )
      }
    }

    return (
      <Grid.Column key={fieldPath} style={{ width }}>
        <Header
          data-testid={`infinityTableHeader-${fieldPath}`}
          onClick={
            enableTableColumnSorting
              ? event => this.handleClickSorting(event, fieldPath, 'asc')
              : undefined
          }
          size="small"
        >
          <Header.Content>
            <Translate capitalize textKey={label} />
          </Header.Content>
        </Header>
      </Grid.Column>
    )
  }

  render() {
    const {
      height,
      topOffset,
      scrollLeft,
      tableColumnSpecifications,
      tableColumnsToShow,
      width: gridWidth,
    } = this.props
    return (
      <React.Fragment>
        <Grid
          data-testid="infinityTableHeader"
          padded
          style={{
            height,
            left: -scrollLeft,
            position: 'absolute',
            top: topOffset,
            width: gridWidth,
          }}
          textAlign="left"
          verticalAlign="middle"
        >
          {tableColumnSpecifications.map(({ fieldPath, label, width }) => {
            if (tableColumnsToShow.includes(fieldPath)) {
              return this.renderColumnHeader({ fieldPath, label, width })
            }
            return null
          })}
        </Grid>
      </React.Fragment>
    )
  }
}

InfinityTableHeader.propTypes = propTypes
InfinityTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('tableScrollContainer')(
  InfinityTableHeader
)
