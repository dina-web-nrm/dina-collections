import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'domainModules/locality/keyObjectModule'
import ListItem from './ListItem'

const mapStateToProps = state => {
  const filter = keyObjectGlobalSelectors.get['filter:index'](state, {
    index: 'localityCollection',
  })
  return {
    curatedLocalities: localityServiceSelectors.getCuratedLocalitiesArrayByFilter(
      state,
      filter
    ),
  }
}

const mapDispatchToProps = {
  delFilterLimit: keyObjectActionCreators.del['filter:index.limit'],
  getCuratedLocalities: getCuratedLocalitiesAc,
  setFilterLimit: keyObjectActionCreators.set['filter:index.limit'],
}

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocalities: PropTypes.array,
  delFilterLimit: PropTypes.func.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  setFilterLimit: PropTypes.func.isRequired,
}

const defaultProps = {
  activeLocalityId: '',
  curatedLocalities: [],
}

class LocalityList extends Component {
  componentDidMount() {
    this.props.setFilterLimit('localityCollection', 10)
    this.props.getCuratedLocalities({
      queryParams: { relationships: ['all'] },
    })
  }

  componentWillUnmount() {
    this.props.delFilterLimit('localityCollection')
  }

  render() {
    const { activeLocalityId, curatedLocalities, onInteraction } = this.props
    return (
      <List divided selection size="small" verticalAlign="middle">
        {curatedLocalities.map(curatedLocality => {
          return (
            <ListItem
              activeLocalityId={activeLocalityId}
              curatedLocality={curatedLocality}
              key={curatedLocality.id}
              onInteraction={onInteraction}
            />
          )
        })}
      </List>
    )
  }
}

LocalityList.propTypes = propTypes
LocalityList.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  LocalityList
)
