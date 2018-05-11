import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { ITEM_CLICK } from 'coreModules/crudBlocks/constants'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'coreModules/crudBlocks/keyObjectModule'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import storageSelectors from '../../../globalSelectors'
import { GROUP_2 } from '../../../constants'
import ListItem from './ListItem'

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })
  const filterParentId = (filter && filter.parentId) || undefined
  const filterParent =
    filterParentId &&
    globalCrudSelectors.storageLocation.getOne(state, filterParentId)

  const storageLocations = storageSelectors.getStorageLocationsArrayByFilter(
    state,
    filter
  )
  return {
    filter,
    filterParent,
    numberOfStorageLocations: storageLocations.length,
    storageLocations,
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
  activeStorageLocationId: PropTypes.string,
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  filterParent: PropTypes.object,
  name: PropTypes.string.isRequired,
  numberOfStorageLocations: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
  setFilterParentId: PropTypes.func.isRequired,
  setFilterSearchGroup: PropTypes.func.isRequired,
  setFilterSearchSearchQuery: PropTypes.func.isRequired,
  storageLocations: PropTypes.array,
}

const defaultProps = {
  activeStorageLocationId: '',
  filter: {},
  filterParent: undefined,
  storageLocations: [],
}

class StorageLocationsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 0,
    }

    this.getIndexFromOffsetAndNumberOfStorageLocationsLocalities = this.getIndexFromOffsetAndNumberOfStorageLocationsLocalities.bind(
      this
    )
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setCursorIndex = this.setCursorIndex.bind(this)
  }

  componentWillMount() {
    const { name } = this.props
    this.props.setFilter(
      {
        group: GROUP_2,
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

  getIndexFromOffsetAndNumberOfStorageLocationsLocalities() {
    const { filter: { offset }, numberOfStorageLocations } = this.props

    return Math.max(Math.min(offset, numberOfStorageLocations - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  expandLocalityAtCursor() {
    const { storageLocations, name } = this.props
    const { cursorIndex } = this.state
    const storageLocationAtCursor = storageLocations[cursorIndex]
    if (storageLocationAtCursor) {
      this.props.setFilterOffset(0, { name })
      this.setCursorIndex(0)
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterParentId(storageLocationAtCursor.id, { name })
    }
  }

  selectParent() {
    const { filter, filterParent, name } = this.props

    if (filterParent && filterParent.parent && filterParent.parent.id) {
      const filterParentParentId = filterParent.parent.id
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterOffset(
        this.getIndexFromOffsetAndNumberOfStorageLocationsLocalities(),
        { name }
      )

      if (filterParent.parent.id === '1') {
        this.props.setFilterParentId('', { name }) // don't use root as only parent filter

        if (!filter.group) {
          this.props.setFilterSearchGroup(GROUP_2, { name })
        }
      } else {
        this.setCursorIndex(
          this.getIndexFromOffsetAndNumberOfStorageLocationsLocalities()
        )
        this.props.setFilterParentId(filterParentParentId, { name })
      }
    }
  }

  selectLocalityAtCursor() {
    const { storageLocations } = this.props
    const { cursorIndex } = this.state
    const storageLocationAtCursor = storageLocations[cursorIndex]
    if (storageLocationAtCursor) {
      this.props.onInteraction(ITEM_CLICK, {
        itemId: storageLocationAtCursor.id,
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
    const {
      filter: { offset, limit },
      name,
      numberOfStorageLocations,
    } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfStorageLocations) {
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
      activeStorageLocationId,
      disableEdit,
      displayNavigationButtons,
      onInteraction,
      storageLocations,
    } = this.props

    return (
      <List divided selection size="small" verticalAlign="middle">
        {storageLocations.map((storageLocation, index) => {
          const cursorFocus = index === cursorIndex
          return (
            <ListItem
              activeStorageLocationId={activeStorageLocationId}
              cursorFocus={cursorFocus}
              disableEdit={disableEdit}
              displayNavigationButtons={displayNavigationButtons}
              key={storageLocation.id}
              onInteraction={onInteraction}
              storageLocation={storageLocation}
            />
          )
        })}
      </List>
    )
  }
}

StorageLocationsList.propTypes = propTypes
StorageLocationsList.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    relationships: ['parent'],
    resource: 'storageLocation',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(StorageLocationsList)
