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
import { ensureAllPlacesFetched } from 'dataModules/placeService/higherOrderComponents'
import placeServiceSelectors from 'dataModules/placeService/globalSelectors'
import placeSelectors from '../../../globalSelectors'
import { CONTINENT } from '../../../constants'
import ListItem from './ListItem'

const mapStateToProps = (state, { name }) => {
  const filter = keyObjectGlobalSelectors.get[':name.filter'](state, { name })
  const filterParentId = (filter && filter.parentId) || undefined
  const filterParent =
    filterParentId && placeServiceSelectors.getPlace(state, filterParentId)

  const places = placeSelectors.getPlacesArrayByFilter(state, filter)

  return {
    filter,
    filterParent,
    numberOfPlaces: places.length,
    places,
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
  disableEdit: PropTypes.bool.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filter: PropTypes.object,
  filterParent: PropTypes.object,
  itemId: PropTypes.string,
  name: PropTypes.string.isRequired,
  numberOfPlaces: PropTypes.number.isRequired,
  onInteraction: PropTypes.func.isRequired,
  places: PropTypes.array,
  setFilter: PropTypes.func.isRequired,
  setFilterOffset: PropTypes.func.isRequired,
  setFilterParentId: PropTypes.func.isRequired,
  setFilterSearchGroup: PropTypes.func.isRequired,
  setFilterSearchSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  filter: {},
  filterParent: undefined,
  itemId: '',
  places: [],
}

class LocalityList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursorIndex: 0,
    }

    this.getIndexFromOffsetAndNumberOfLocalities = this.getIndexFromOffsetAndNumberOfLocalities.bind(
      this
    )
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.setCursorIndex = this.setCursorIndex.bind(this)
  }

  componentWillMount() {
    const { name } = this.props
    this.props.setFilter(
      {
        group: CONTINENT,
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

  getIndexFromOffsetAndNumberOfLocalities() {
    const { filter: { offset }, numberOfPlaces } = this.props

    return Math.max(Math.min(offset, numberOfPlaces - 1), 0)
  }

  setCursorIndex(cursorIndex = 0) {
    this.setState({ cursorIndex })
  }

  expandLocalityAtCursor() {
    const { places, name } = this.props
    const { cursorIndex } = this.state
    const localityAtCursor = places[cursorIndex]
    if (localityAtCursor) {
      this.props.setFilterOffset(0, { name })
      this.setCursorIndex(0)
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterParentId(localityAtCursor.id, { name })
    }
  }

  selectParent() {
    const { filter, filterParent, name } = this.props

    if (filterParent && filterParent.parent && filterParent.parent.id) {
      const filterParentParentId = filterParent.parent.id
      this.props.setFilterSearchGroup('', { name })
      this.props.setFilterSearchSearchQuery('', { name })
      this.props.setFilterOffset(
        this.getIndexFromOffsetAndNumberOfLocalities(),
        { name }
      )

      if (filterParent.parent.id === '1') {
        this.props.setFilterParentId('', { name }) // don't use root as only parent filter

        if (!filter.group) {
          this.props.setFilterSearchGroup(CONTINENT, { name })
        }
      } else {
        this.setCursorIndex(this.getIndexFromOffsetAndNumberOfLocalities())
        this.props.setFilterParentId(filterParentParentId, { name })
      }
    }
  }

  selectLocalityAtCursor() {
    const { places } = this.props
    const { cursorIndex } = this.state
    const localityAtCursor = places[cursorIndex]
    if (localityAtCursor) {
      this.props.onInteraction(ITEM_CLICK, { itemId: localityAtCursor.id })
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
    const { filter: { offset, limit }, name, numberOfPlaces } = this.props
    const { cursorIndex } = this.state

    if (cursorIndex === numberOfPlaces) {
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
      disableEdit,
      displayNavigationButtons,
      itemId,
      onInteraction,
      places,
    } = this.props

    return (
      <List divided selection size="small" verticalAlign="middle">
        {places.map((place, index) => {
          const cursorFocus = index === cursorIndex
          return (
            <ListItem
              cursorFocus={cursorFocus}
              disableEdit={disableEdit}
              displayNavigationButtons={displayNavigationButtons}
              itemId={itemId}
              key={place.id}
              onInteraction={onInteraction}
              place={place}
            />
          )
        })}
      </List>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(
  ensureAllPlacesFetched(),
  connect(mapStateToProps, mapDispatchToProps)
)(LocalityList)
