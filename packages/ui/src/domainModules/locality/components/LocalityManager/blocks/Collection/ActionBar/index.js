import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Dropdown, Grid, Form } from 'semantic-ui-react'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'domainModules/locality/keyObjectModule'

import {
  SET_COLLECTION_LIST,
  SET_COLLECTION_TREE,
  SET_ITEM_CREATE,
} from 'domainModules/locality/interactions'

import { InputText } from 'coreModules/form/components'
import AncestorTag from './AncestorTag'

const mapStateToProps = state => {
  return {
    filterGroup: keyObjectGlobalSelectors.get['filter.group'](state),
    searchQuery: keyObjectGlobalSelectors.get['filter.searchQuery'](state),
  }
}

const mapDispatchToProps = {
  setFilterGroup: keyObjectActionCreators.set['filter.group'],
  setListMode: keyObjectActionCreators.set.listMode,
  setParentId: keyObjectActionCreators.set['filter.parentId'],
  setSearchQuery: keyObjectActionCreators.set['filter.searchQuery'],
}

const propTypes = {
  collectionBlockType: PropTypes.string.isRequired,
  displayNavigationButtons: PropTypes.bool.isRequired,
  filterGroup: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  setFilterGroup: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  filterGroup: '',
  searchQuery: '',
}

const groups = ['continent', 'country', 'district', 'province']

const dropdownOptions = [
  {
    text: 'all',
    value: '',
  },
  ...groups.map(group => {
    return {
      text: group,
      value: group,
    }
  }),
]

class ActionBar extends Component {
  render() {
    const {
      collectionBlockType,
      displayNavigationButtons,
      onInteraction,
    } = this.props
    return (
      <Form style={{ marginBottom: 10 }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button.Group floated="left">
                <Button
                  active={collectionBlockType === 'list'}
                  content="List"
                  onClick={event => {
                    event.preventDefault()
                    onInteraction(SET_COLLECTION_LIST)
                  }}
                />
                <Button
                  active={collectionBlockType === 'tree'}
                  content="Tree"
                  onClick={event => {
                    event.preventDefault()
                    onInteraction(SET_COLLECTION_TREE)
                  }}
                />
              </Button.Group>
              <InputText
                icon="search"
                input={{
                  onChange: event => {
                    this.props.setSearchQuery(event.target.value)
                  },
                  value: this.props.searchQuery,
                }}
                placeholder="search"
                style={{ marginLeft: 10 }}
              />
              <Dropdown
                button
                className="icon"
                icon="filter"
                labeled
                onChange={(res, data) => {
                  this.props.setFilterGroup(data.value)
                }}
                options={dropdownOptions}
                placeholder="select group"
                size="small"
                style={{ marginLeft: 10, minWidth: 140 }}
                value={this.props.filterGroup}
              />
            </Grid.Column>
            <Grid.Column verticalAlign="bottom" width={14}>
              <AncestorTag />
            </Grid.Column>
            {displayNavigationButtons && (
              <Grid.Column textAlign="right" width={2}>
                <Button.Group floated="right">
                  <Button
                    color="orange"
                    floaded="right"
                    onClick={event => {
                      event.preventDefault()
                      onInteraction(SET_ITEM_CREATE)
                    }}
                  >
                    New
                  </Button>
                </Button.Group>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </Form>
    )
  }
}

ActionBar.propTypes = propTypes
ActionBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(ActionBar)
