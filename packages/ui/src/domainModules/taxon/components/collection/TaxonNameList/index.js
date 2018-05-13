import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { BlockLoader } from 'coreModules/crudBlocks/components'
import { ITEM_CLICK } from 'coreModules/crudBlocks/constants'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/crudBlocks/keyObjectModule'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'

import taxonSelectors from '../../../globalSelectors'
import ListItem from './ListItem'

const log = createLog('modules:taxon:TaxonNameList')

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })

  const taxonNames = taxonSelectors.getTaxonNamesArrayByFilter(state, filter)

  return {
    filter,
    numberOfTaxonNames: taxonNames.length,
    taxonNames,
  }
}

const mapDispatchToProps = {
  setFilter: keyObjectActionCreators.set[':name.filter'],
  setFilterOffset: keyObjectActionCreators.set[':name.filter.offset'],
}

const propTypes = {
  activeTaxonNameId: PropTypes.string,
  allTaxonNamesFetched: PropTypes.bool.isRequired,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  name: PropTypes.string.isRequired,
  numberOfTaxonNames: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
  taxonNames: PropTypes.array,
}

const defaultProps = {
  activeTaxonNameId: '',
  filter: {},
  taxonNames: [],
}

class TaxonNameList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 0,
    }

    this.getIndexFromOffsetAndNumberOfItems = this.getIndexFromOffsetAndNumberOfItems.bind(
      this
    )
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setCursorIndex = this.setCursorIndex.bind(this)
  }

  componentWillMount() {
    const { name } = this.props
    this.props.setFilter(
      {
        group: '',
        limit: 10,
        offset: 0,
        searchQuery: '',
      },
      { name }
    )
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  getIndexFromOffsetAndNumberOfItems() {
    const { filter: { offset }, numberOfTaxonNames } = this.props

    return Math.max(Math.min(offset, numberOfTaxonNames - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  selectLocalityAtCursor() {
    const { taxonNames } = this.props
    const { cursorIndex } = this.state
    const taxonNameAtCursor = taxonNames[cursorIndex]
    if (taxonNameAtCursor) {
      this.props.onInteraction(ITEM_CLICK, {
        itemId: taxonNameAtCursor.id,
      })
    }
  }

  moveCursorUp() {
    const { filter: { offset, limit }, name } = this.props
    const { cursorIndex } = this.state
    if (offset > 0 && cursorIndex === 0) {
      this.props.setFilterOffset(Math.max(offset - 1, 0), { name })
      this.setState({
        cursorIndex: limit - 1,
      })
    }

    this.setState({
      cursorIndex: Math.max(cursorIndex - 1, 0),
    })
  }

  moveCursorDown() {
    const { filter: { offset, limit }, name, numberOfTaxonNames } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfTaxonNames) {
      return null
    }
    if (cursorIndex === limit - 1) {
      return this.props.setFilterOffset(offset + 1, { name })
    }

    return this.setState({
      cursorIndex: Math.min(cursorIndex + 1, limit),
    })
  }

  handleKeyDown({ key }) {
    switch (key) {
      case 'ArrowDown': {
        return this.moveCursorDown()
      }
      case 'ArrowUp': {
        return this.moveCursorUp()
      }
      case 'Enter': {
        return this.selectLocalityAtCursor()
      }
      default: {
        return null
      }
    }
  }

  render() {
    log.render()
    const { cursorIndex } = this.state
    const {
      activeTaxonNameId,
      allTaxonNamesFetched,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
      taxonNames,
    } = this.props

    if (!allTaxonNamesFetched) {
      return <BlockLoader />
    }

    return (
      <List divided selection size="small" verticalAlign="middle">
        {taxonNames
          .map((taxonName, index) => {
            const cursorFocus = index === cursorIndex
            const { attributes: { name, rank }, id } = taxonName

            return (
              <ListItem
                activeId={activeTaxonNameId}
                cursorFocus={cursorFocus}
                disableEdit={disableEdit}
                displayNavigationButtons={displayNavigationButtons}
                itemId={id}
                key={id}
                name={name}
                onInteraction={onInteraction}
                rank={rank}
              />
            )
          })
          .filter(item => !!item)}
      </List>
    )
  }
}

TaxonNameList.propTypes = propTypes
TaxonNameList.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxonNamesFetched',
    resource: 'taxonName',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(TaxonNameList)
