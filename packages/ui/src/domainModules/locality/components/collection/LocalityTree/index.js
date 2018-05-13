import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'

import { createSortAlphabeticallyByProperty } from 'common/es5/sortMethods'

import crudActionCreators from 'coreModules/crud/actionCreators'
import { getParentId } from 'coreModules/crud/utilities'
import { globalSelectors as keyObjectGlobalSelectors } from 'coreModules/crudBlocks/keyObjectModule'
import {
  SET_ITEM_EDIT,
  SET_ITEM_INSPECT,
} from 'coreModules/crudBlocks/constants'

const sortAlphabetically = createSortAlphabeticallyByProperty('title')

const mapStateToProps = (state, { name }) => {
  return {
    searchQuery: keyObjectGlobalSelectors.get[':name.filter.searchQuery'](
      state,
      { name }
    ),
  }
}

const mapDispatchToProps = {
  getPlacesAc: crudActionCreators.place.getMany,
}

const propTypes = {
  disableEdit: PropTypes.bool.isRequired,
  getPlacesAc: PropTypes.func.isRequired,
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
      .getPlacesAc({
        queryParams: { relationships: ['all'] },
      })
      .then(places => {
        const flatData = places
          .map(place => {
            const { id, attributes = {} } = place
            return {
              id,
              parentId: getParentId(place) || '0',
              title: attributes.name,
            }
          })
          .sort(sortAlphabetically)

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

Localities.propTypes = propTypes
Localities.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(Localities)
