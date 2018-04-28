import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import SortableTree, { getTreeFromFlatData } from 'react-sortable-tree'

import { createSortAlphabeticallyByProperty } from 'common/es5/sortMethods'
import { getTaxa, getTaxonNames } from 'dataModules/taxonService/actionCreators'
import taxonServiceSelectors from 'dataModules/taxonService/globalSelectors'
import { BlockLoader } from 'coreModules/crudBlocks/components'
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
    taxa: taxonServiceSelectors.getTaxaArray(state),
    taxonNames: taxonServiceSelectors.getTaxonNames(state),
  }
}

const mapDispatchToProps = {
  getTaxa,
  getTaxonNames,
}

const propTypes = {
  disableEdit: PropTypes.bool.isRequired,
  getTaxa: PropTypes.func.isRequired,
  getTaxonNames: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  taxa: PropTypes.array.isRequired,
  taxonNames: PropTypes.object.isRequired,
}

const defaultProps = {
  searchQuery: '',
}

class TaxaTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      loadingData: true,
      treeData: [],
    }
    this.generateNodeProps = this.generateNodeProps.bind(this)
  }

  componentWillMount() {
    // TODO refactor this
    return Promise.all([
      this.props.getTaxa({
        queryParams: { relationships: ['all'] },
      }),
      this.props.getTaxonNames({
        queryParams: { relationships: [] },
      }),
    ]).then(() => {
      this.setState({ loadingData: false })
    })
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.state.loadingData && !nextState.loadingData) {
      const { taxa, taxonNames } = nextProps

      const flatData = taxa
        .map(taxon => {
          if (!taxon.acceptedTaxonName) {
            return null
          }

          return {
            id: taxon.id,
            parentId: (taxon.parent && taxon.parent.id) || '0',
            title: taxonNames[taxon.acceptedTaxonName.id].name,
          }
        })
        .filter(node => !!node)
        .sort(sortAlphabetically)

      const parent = {
        id: '0',
        title: 'Chordata',
      }

      const treeData = getTreeFromFlatData({
        flatData: [parent, ...flatData],
        rootKey: '0',
      })

      this.setState({
        loading: false,
        treeData,
      })
    }
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
    const { loading, treeData } = this.state

    if (loading) {
      return <BlockLoader />
    }

    return (
      <div style={{ height: '600px' }}>
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

TaxaTree.propTypes = propTypes
TaxaTree.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(TaxaTree)
