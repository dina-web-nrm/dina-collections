import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider, Grid, Header, Icon } from 'semantic-ui-react'
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
  scrollLeft: PropTypes.number,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  topOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}

const defaultProps = {
  scrollLeft: 0,
}

class InfiniteTableHeader extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      sortingColumns: [],
    }

    this.handleSorting = this.handleSorting.bind(this)
  }

  getColumnHeader(columnWidth, name) {
    const { sortingColumns } = this.state

    const isColumnSorted = sortingColumns.find(column => column.name === name)

    if (isColumnSorted) {
      const sortOrder = isColumnSorted.sort
      const iconName = sortOrder === 'asc' ? 'caret down' : 'caret up'
      return (
        <Grid.Column key={name} style={{ width: columnWidth }}>
          <Header
            onClick={event => this.handleSorting(event, name, sortOrder)}
            size="small"
          >
            <Icon name={iconName} />
            <Header.Content>
              <ModuleTranslate capitalize textKey={`tableColumns.${name}`} />
            </Header.Content>
          </Header>
        </Grid.Column>
      )
    }

    return (
      <Grid.Column key={name} style={{ width: columnWidth }}>
        <Header
          onClick={event => this.handleSorting(event, name, 'asc')}
          size="small"
        >
          <Header.Content>
            <ModuleTranslate capitalize textKey={`tableColumns.${name}`} />
          </Header.Content>
        </Header>
      </Grid.Column>
    )
  }

  handleSorting(event, columnName, sortOrder) {
    if (event) {
      event.preventDefault()
    }

    const elements = [...this.state.sortingColumns]
    const index = elements.findIndex(column => column.name === columnName)

    if (index >= 0) {
      const sort = sortOrder === 'asc' ? 'dsc' : 'asc'
      elements[index] = { name: columnName, sort }
      this.setState({ sortingColumns: elements })
    } else {
      const newElement = { name: columnName, sort: sortOrder }
      this.setState({
        sortingColumns: [...this.state.sortingColumns, newElement],
      })
    }
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
          <Grid.Column style={{ width: 80 }} textAlign="right">
            <Header size="small">Row #</Header>
          </Grid.Column>
          {tableColumnSpecifications.map(({ name, width: columnWidth }) => {
            if (tableColumnsToShow.includes(name)) {
              return this.getColumnHeader(columnWidth, name)
            }
            return null
          })}
        </Grid>
        <Divider fitted />
      </React.Fragment>
    )
  }
}

InfiniteTableHeader.propTypes = propTypes
InfiniteTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('resultTableScrollContainer')(
  InfiniteTableHeader
)
