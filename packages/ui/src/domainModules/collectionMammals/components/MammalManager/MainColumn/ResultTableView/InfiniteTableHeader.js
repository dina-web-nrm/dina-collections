import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Icon } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import createLog from 'utilities/log'
import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'
import tableColumnSpecifications from '../tableColumnSpecifications'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTableHeader'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  height: PropTypes.number.isRequired,
  onSaveTableColumnsToSort: PropTypes.func.isRequired,
  scrollLeft: PropTypes.number,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableColumnsToSort: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  topOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  scrollLeft: 0,
}

class InfiniteTableHeader extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClickSorting = this.handleClickSorting.bind(this)
  }

  handleClickSorting(event, columnName, sortOrder) {
    if (event) {
      event.preventDefault()
    }

    // let columnsToSort
    const { tableColumnsToSort } = this.props
    if (tableColumnsToSort) {
      const columnsToSort = [...tableColumnsToSort]
      const index = columnsToSort.findIndex(
        column => column.name === columnName
      )

      if (index > -1) {
        const sort = sortOrder === 'asc' ? 'desc' : 'asc'
        columnsToSort[index] = { name: columnName, sort }
        return this.props.onSaveTableColumnsToSort(columnsToSort)
      }

      return this.props.onSaveTableColumnsToSort([
        // ...tableColumnsToSort,
        { name: columnName, sort: sortOrder },
      ])
    }
    return this.props.onSaveTableColumnsToSort([
      { name: columnName, sort: sortOrder },
    ])
  }

  renderColumnHeader(columnWidth, name) {
    const { tableColumnsToSort } = this.props

    if (tableColumnsToSort) {
      const sortedColumn = tableColumnsToSort.find(
        column => column.name === name
      )

      if (sortedColumn) {
        const sortOrder = sortedColumn.sort
        const iconName = sortOrder === 'asc' ? 'caret down' : 'caret up'
        return (
          <Grid.Column key={name} style={{ width: columnWidth }}>
            <Header
              data-testid={`InfiniteTableHeader-${name}`}
              onClick={event => this.handleClickSorting(event, name, sortOrder)}
              size="small"
            >
              <Header.Content>
                <ModuleTranslate capitalize textKey={`tableColumns.${name}`} />
                <Icon name={iconName} />
              </Header.Content>
            </Header>
          </Grid.Column>
        )
      }
    }

    return (
      <Grid.Column key={name} style={{ width: columnWidth }}>
        <Header
          data-testid={`InfiniteTableHeader-${name}`}
          onClick={event => this.handleClickSorting(event, name, 'asc')}
          size="small"
        >
          <Header.Content>
            <ModuleTranslate capitalize textKey={`tableColumns.${name}`} />
          </Header.Content>
        </Header>
      </Grid.Column>
    )
  }

  render() {
    log.render()
    const {
      height,
      topOffset,
      scrollLeft,
      tableColumnsToShow,
      width,
    } = this.props
    return (
      <React.Fragment>
        <Grid
          padded
          style={{
            height,
            left: -scrollLeft,
            position: 'absolute',
            top: topOffset,
            width,
          }}
          textAlign="left"
          verticalAlign="middle"
        >
          {tableColumnSpecifications.map(({ name, width: columnWidth }) => {
            if (tableColumnsToShow.includes(name)) {
              return this.renderColumnHeader(columnWidth, name)
            }
            return null
          })}
        </Grid>
      </React.Fragment>
    )
  }
}

InfiniteTableHeader.propTypes = propTypes
InfiniteTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('resultTableScrollContainer')(
  InfiniteTableHeader
)
