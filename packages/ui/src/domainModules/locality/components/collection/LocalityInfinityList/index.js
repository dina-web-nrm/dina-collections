import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { Button, Icon, Item } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getPlaces as getPlacesAc } from 'dataModules/localityService/actionCreators'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'
import localitySelectors from '../../../globalSelectors'

const mapStateToProps = state => {
  const filter = keyObjectGlobalSelectors.get.filter(state)
  return {
    places: localitySelectors.getPlacesArrayByFilter(state, filter),
  }
}

const mapDispatchToProps = {
  getPlaces: getPlacesAc,
}

const propTypes = {
  getPlaces: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
  places: PropTypes.array.isRequired,
}

const defaultProps = {
  onItemClick: undefined,
}

class LocalityList extends Component {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  componentDidMount() {
    this.props.getPlaces({
      queryParams: { relationships: ['all'] },
    })
  }

  handleItemClick(id, action) {
    if (this.props.onItemClick) {
      this.props.onItemClick(id, action)
    }
  }

  renderItem(index) {
    const place = this.props.places[index]
    return (
      <Item
        key={place.id}
        style={{
          borderBottom: '1px solid rgba(34,36,38,.15)',
          height: '50px',
          paddingBottom: '5px',
          paddingTop: '5px',
        }}
      >
        <Item.Content>
          <Item.Header as="h4">
            {place.name} ({place.group})
            <Button.Group basic floated="right" size="small">
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(place.id, 'edit')
                }}
              >
                <Icon name="edit" />
              </Button>
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(place.id, 'view')
                }}
              >
                <Icon name="folder open" />
              </Button>
            </Button.Group>
          </Item.Header>
        </Item.Content>
      </Item>
    )
  }

  render() {
    return (
      <div style={{ maxHeight: 400, overflow: 'auto' }}>
        <ReactList
          itemRenderer={this.renderItem}
          length={this.props.places.length}
          type="uniform"
        />
      </div>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityList
)
