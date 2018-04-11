import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'

import { getStorageLocations as getStorageLocationsAc } from 'dataModules/storageService/actionCreators'
import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/crudBlocks/keyObjectModule'
import {
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'

const mapStateToProps = (state, { name }) => {
  return {
    searchQuery: keyObjectGlobalSelectors.get[':name.filter.searchQuery'](
      state,
      { name }
    ),
  }
}

const mapDispatchToProps = {
  getStorageLocationsAc,
}

const propTypes = {
  disableEdit: PropTypes.bool.isRequired,
  getStorageLocationsAc: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
}

const defaultProps = {
  searchQuery: '',
}

class StorageLocationsTree extends Component {
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
      .getStorageLocationsAc({
        queryParams: { relationships: ['all'] },
      })
      .then(storageLocations => {
        const flatData = storageLocations.map(storageLocation => {
          return {
            id: storageLocation.id,
            parentId:
              (storageLocation.parent && storageLocation.parent.id) || '0',
            title: storageLocation.name,
          }
        })
        const parent = {
          id: '0',
          title: 'NRM ZOO',
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
        this.props.disableEdit ? null : (
          <Button
            icon
            onClick={() => {
              this.props.onInteraction(SET_ITEM_EDIT, {
                itemId: node.id,
              })
            }}
          >
            <Icon name="edit" />
          </Button>
        ),
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
      ].filter(element => !!element),
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

StorageLocationsTree.propTypes = propTypes
StorageLocationsTree.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(
  StorageLocationsTree
)
