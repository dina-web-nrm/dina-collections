import React, { Component } from 'react'

import { CrudBlocksWrapper } from 'coreModules/crudBlocks/components'

import globalSelectors from '../../globalSelectors'
import { ALL, CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../constants'
import CreateForm from '../item/form/Create'
import EditForm from '../item/form/Edit'
import InspectView from '../item/Inspect'
import LocalityList from '../collection/LocalityList'
import LocalityTree from '../collection/LocalityTree'

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE]

const DROPDOWN_FILTER_OPTIONS = [
  {
    key: ALL,
    text: ALL,
    value: '',
  },
  ...groups.map(group => {
    return {
      key: group,
      text: group,
      value: group,
    }
  }),
]

const propTypes = {}

class LocalityManager extends Component {
  static renderCreateForm(props) {
    return <CreateForm {...props} />
  }

  static renderEditForm(props) {
    return <EditForm {...props} />
  }

  static renderInspectView(props) {
    return <InspectView {...props} />
  }

  static renderList(props) {
    return <LocalityList {...props} />
  }

  static renderTree(props) {
    return <LocalityTree {...props} />
  }

  render() {
    return (
      <CrudBlocksWrapper
        dropdownFilterOptions={DROPDOWN_FILTER_OPTIONS}
        getAncestorsByParentId={globalSelectors.getPlaceAncestorsById}
        itemIdParamName="localityId"
        name="locality"
        renderCreateForm={LocalityManager.renderCreateForm}
        renderEditForm={LocalityManager.renderEditForm}
        renderInspectView={LocalityManager.renderInspectView}
        renderList={LocalityManager.renderList}
        renderTree={LocalityManager.renderTree}
        urlBasePath="/app/localities"
      />
    )
  }
}

LocalityManager.propTypes = propTypes

export default LocalityManager
