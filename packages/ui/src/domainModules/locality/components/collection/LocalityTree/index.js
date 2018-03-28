import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { getCuratedLocalities as getCuratedLocalitiesAc } from 'domainModules/localityService/actionCreators'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'
import { globalSelectors as keyObjectGlobalSelectors } from 'domainModules/locality/keyObjectModule'
import {
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'domainModules/locality/interactions'

const mapStateToProps = state => {
  return {
    searchQuery: keyObjectGlobalSelectors.get['filter:index.searchQuery'](
      state,
      {
        index: 'localityCollection',
      }
    ),
  }
}

const mapDispatchToProps = {
  getCuratedLocalitiesAc,
}

const propTypes = {
  getCuratedLocalitiesAc: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
}

const defaultProps = {
  searchQuery: '',
}

class Localities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: [],
    }
    this.generateNodeProps = this.generateNodeProps.bind(this)
  }

  componentWillMount() {
    // TODO refactor this
    this.props
      .getCuratedLocalitiesAc({
        queryParams: { relationships: ['all'] },
      })
      .then(localities => {
        const flatData = localities.map(locality => {
          return {
            id: locality.id,
            parentId: (locality.parent && locality.parent.id) || '0',
            title: locality.name,
          }
        })
        const parent = {
          id: '0',
          title: 'Earth',
        }

        const treeData = getTreeFromFlatData({
          flatData: [parent, ...flatData],
          rootKey: '0',
        })
        this.setState({
          treeData,
        })
      })
  }

  generateNodeProps({ node }) {
    return {
      buttons: [
        <Button
          icon
          onClick={() => {
            this.props.onInteraction(SET_ITEM_EDIT, {
              itemId: node.id,
            })
          }}
        >
          <Icon name="edit" />
        </Button>,
        <Button
          icon
          onClick={() => {
            this.props.onInteraction(SET_ITEM_INSPECT, {
              itemId: node.id,
            })
          }}
        >
          <Icon name="folder open" />
        </Button>,
      ],
    }
  }
  render() {
    const { treeData } = this.state
    return (
      <div style={{ height: '400px' }}>
        <SortableTree
          expandOnlySearchedNodes
          generateNodeProps={this.generateNodeProps}
          onChange={newTreeData => this.setState({ treeData: newTreeData })}
          searchQuery={this.props.searchQuery}
          treeData={treeData}
        />
      </div>
    )
  }
}

Localities.propTypes = propTypes
Localities.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(Localities)
