import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

import { Translate } from 'coreModules/i18n/components'
import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'

const propTypes = {
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

  handleClickSorting(event, fieldPath, sortOrder) {
    if (event) {
      event.preventDefault()
    }

    const { tableColumnsToSort } = this.props
    if (tableColumnsToSort) {
      const columnsToSort = [...tableColumnsToSort]
      const index = columnsToSort.findIndex(
        column => column.fieldPath === fieldPath
      )

      if (index > -1) {
        const sort = sortOrder === 'asc' ? 'desc' : 'asc'
        columnsToSort[index] = { fieldPath, sort }
        return this.props.onSaveTableColumnsToSort(columnsToSort)
      }

      return this.props.onSaveTableColumnsToSort([
        // ...tableColumnsToSort,
        { fieldPath, sort: sortOrder },
      ])
    }
    return this.props.onSaveTableColumnsToSort([{ fieldPath, sort: sortOrder }])
  }

  renderColumnHeader({ fieldPath, label, width }) {
    const { tableColumnsToSort } = this.props

    if (tableColumnsToSort) {
      const sortedColumn = tableColumnsToSort.find(
        column => column.fieldPath === fieldPath
      )

      if (sortedColumn) {
        const sortOrder = sortedColumn.sort
        const iconName = sortOrder === 'asc' ? 'caret down' : 'caret up'
        return (
          <Grid.Column key={fieldPath} style={{ width }}>
            <Header
              data-testid={`infinityTableHeader-${fieldPath}`}
              onClick={event =>
                this.handleClickSorting(event, fieldPath, sortOrder)
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
          onClick={event => this.handleClickSorting(event, fieldPath, 'asc')}
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

export default createInjectScrollLeft('resultTableScrollContainer')(
  InfinityTableHeader
)
