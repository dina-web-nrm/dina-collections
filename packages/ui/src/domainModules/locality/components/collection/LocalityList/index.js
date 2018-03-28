import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import {
  globalSelectors as keyObjectGlobalSelectors,
  actionCreators as keyObjectActionCreators,
} from 'domainModules/locality/keyObjectModule'
import { ensureAllLocalitiesFetched } from 'domainModules/locality/higherOrderComponents'
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
  setFilterLimit: keyObjectActionCreators.set['filter:index.limit'],
}

const propTypes = {
  activeLocalityId: PropTypes.string,
  curatedLocalities: PropTypes.array,
  displayNavigationButtons: PropTypes.func.isRequired,
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
  }

  render() {
    const {
      activeLocalityId,
      curatedLocalities,
      displayNavigationButtons,
      onInteraction,
    } = this.props
    return (
      <List divided selection size="small" verticalAlign="middle">
        {curatedLocalities.map(curatedLocality => {
          return (
            <ListItem
              activeLocalityId={activeLocalityId}
              curatedLocality={curatedLocality}
              displayNavigationButtons={displayNavigationButtons}
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

export default compose(
  ensureAllLocalitiesFetched,
  connect(mapStateToProps, mapDispatchToProps)
)(LocalityList)
