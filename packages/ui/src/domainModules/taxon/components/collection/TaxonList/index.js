import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { BlockLoader } from 'coreModules/crudBlocks/components'
import { ITEM_CLICK } from 'coreModules/crudBlocks/constants'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/crudBlocks/keyObjectModule'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import taxonSelectors from '../../../globalSelectors'
import { ORDER } from '../../../constants'
import ListItem from './ListItem'

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })
  const filterParentId = (filter && filter.parentId) || undefined
  const filterParent =
    filterParentId && globalCrudSelectors.taxon.getOne(state, filterParentId)

  const taxa = taxonSelectors.getTaxaArrayByFilter(state, filter)
  const taxonNames = globalCrudSelectors.taxonName.getItemsObject(state)

  return {
    filter,
    filterParent,
    numberOfTaxa: taxa.length,
    taxa,
    taxonNames,
  }
}

const mapDispatchToProps = {
  setFilter: keyObjectActionCreators.set[':name.filter'],
  setFilterOffset: keyObjectActionCreators.set[':name.filter.offset'],
  setFilterParentId: keyObjectActionCreators.set[':name.filter.parentId'],
  setFilterSearchGroup: keyObjectActionCreators.set[':name.filter.group'],
  setFilterSearchSearchQuery:
    keyObjectActionCreators.set[':name.filter.searchQuery'],
}

const propTypes = {
  activeTaxonId: PropTypes.string,
  allTaxaFetched: PropTypes.bool.isRequired,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  filterParent: PropTypes.object,
  name: PropTypes.string.isRequired,
  numberOfTaxa: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
  setFilterParentId: PropTypes.func.isRequired,
  setFilterSearchGroup: PropTypes.func.isRequired,
  setFilterSearchSearchQuery: PropTypes.func.isRequired,
  taxa: PropTypes.array,
}

const defaultProps = {
  activeTaxonId: '',
  filter: {},
  filterParent: undefined,
  taxa: [],
  taxonNames: {},
}

class TaxaList extends Component {
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
        group: ORDER,
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
    const { filter: { offset }, numberOfTaxa } = this.props

    return Math.max(Math.min(offset, numberOfTaxa - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  expandLocalityAtCursor() {
    const { taxa, name } = this.props
    const { cursorIndex } = this.state
    const taxonAtCursor = taxa[cursorIndex]
    if (taxonAtCursor) {
      this.props.setFilterOffset(0, { name })
      this.setCursorIndex(0)
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterParentId(taxonAtCursor.id, { name })
    }
  }

  selectParent() {
    const { filter, filterParent, name } = this.props

    if (filterParent && filterParent.parent && filterParent.parent.id) {
      const filterParentParentId = filterParent.parent.id
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterOffset(this.getIndexFromOffsetAndNumberOfItems(), {
        name,
      })

      if (filterParent.parent.id === '1') {
        this.props.setFilterParentId('', { name }) // don't use root as only parent filter

        if (!filter.group) {
          this.props.setFilterSearchGroup(ORDER, { name })
        }
      } else {
        this.setCursorIndex(this.getIndexFromOffsetAndNumberOfItems())
        this.props.setFilterParentId(filterParentParentId, { name })
      }
    }
  }

  selectLocalityAtCursor() {
    const { taxa } = this.props
    const { cursorIndex } = this.state
    const taxonAtCursor = taxa[cursorIndex]
    if (taxonAtCursor) {
      this.props.onInteraction(ITEM_CLICK, {
        itemId: taxonAtCursor.id,
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
    const { filter: { offset, limit }, name, numberOfTaxa } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfTaxa) {
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
      case 'ArrowLeft': {
        return this.selectParent()
      }
      case 'ArrowRight': {
        return this.expandLocalityAtCursor()
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
    const { cursorIndex } = this.state
    const {
      activeTaxonId,
      allTaxaFetched,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
      taxa,
    } = this.props
    if (!allTaxaFetched) {
      return <BlockLoader />
    }
    return (
      <List divided selection size="small" verticalAlign="middle">
        {taxa
          .map((taxon, index) => {
            const cursorFocus = index === cursorIndex
            return (
              <ListItem
                activeTaxonId={activeTaxonId}
                cursorFocus={cursorFocus}
                disableEdit={disableEdit}
                displayNavigationButtons={displayNavigationButtons}
                key={taxon.id}
                onInteraction={onInteraction}
                taxon={taxon}
              />
            )
          })
          .filter(item => !!item)}
      </List>
    )
  }
}

TaxaList.propTypes = propTypes
TaxaList.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxaFetched',
    relationships: ['parent', 'acceptedTaxonName'],
    resource: 'taxon',
  }),

  connect(mapStateToProps, mapDispatchToProps)
)(TaxaList)
