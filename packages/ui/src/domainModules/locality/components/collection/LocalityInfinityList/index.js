import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactList from 'react-list'
import { Button, Icon, Item } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'

const mapStateToProps = state => {
  const filter = keyObjectGlobalSelectors.get.filter(state)
  return {
    curatedLocalities: localityServiceSelectors.getCuratedLocalitiesArrayByFilter(
      state,
      filter
    ),
  }
}

const mapDispatchToProps = {
  getCuratedLocalities: getCuratedLocalitiesAc,
}

const propTypes = {
  curatedLocalities: PropTypes.array.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  onItemClick: PropTypes.func,
}

const defaultProps = {
  localityId: '',
  onItemClick: undefined,
}

class LocalityList extends Component {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }
  componentDidMount() {
    this.props.getCuratedLocalities({
      queryParams: { relationships: ['all'] },
    })
  }

  handleItemClick(id, action) {
    if (this.props.onItemClick) {
      this.props.onItemClick(id, action)
    }
  }

  renderItem(index) {
    const curatedLocality = this.props.curatedLocalities[index]
    return (
      <Item
        key={curatedLocality.id}
        style={{
          borderBottom: '1px solid rgba(34,36,38,.15)',
          height: '50px',
          paddingBottom: '5px',
          paddingTop: '5px',
        }}
      >
        <Item.Content>
          <Item.Header as="h4">
            {curatedLocality.name} ({curatedLocality.group})
            <Button.Group basic floated="right" size="small">
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(curatedLocality.id, 'edit')
                }}
              >
                <Icon name="edit" />
              </Button>
              <Button
                icon
                onClick={() => {
                  this.handleItemClick(curatedLocality.id, 'view')
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
          length={this.props.curatedLocalities.length}
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
