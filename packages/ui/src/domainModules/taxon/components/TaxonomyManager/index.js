import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'

import { CrudBlocksWrapper } from 'coreModules/crudBlocks/components'

import CreateTaxonForm from '../item/taxon/form/Create'
import EditTaxonForm from '../item/taxon/form/Edit'
import InspectTaxonView from '../item/taxon/Inspect'
import TaxonList from '../collection/TaxonList'
import TaxonTree from '../collection/TaxonTree'

import CreateTaxonNameForm from '../item/taxonName/form/Create'
import EditTaxonNameForm from '../item/taxonName/form/Edit'
import InspectTaxonNameView from '../item/taxonName/Inspect'
import TaxonNameList from '../collection/TaxonNameList'

import globalSelectors from '../../globalSelectors'
import {
  ALL,
  FAMILY,
  GENUS,
  MISSING_RANK,
  ORDER,
  SET_TAXON_INSPECT,
  SET_TAXON_NAME_INSPECT,
  SPECIES,
  SUBSPECIES,
} from '../../constants'

const ranks = [ORDER, FAMILY, GENUS, SPECIES, SUBSPECIES, MISSING_RANK]

const FILTER_OPTIONS = [
  {
    key: ALL,
    text: ALL,
    value: '',
  },
  ...ranks.map(rank => {
    return {
      key: rank,
      text: rank,
      value: rank,
    }
  }),
]

const MENU_SETTINGS = {
  attached: false,
  pointing: true,
  size: 'large',
  tabular: false,
  widths: 2,
}

const mapDispatchToProps = { routerPush: push }

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  routerPush: PropTypes.func.isRequired,
}

class TaxonomyManager extends Component {
  static renderTaxonCreateForm(props) {
    return <CreateTaxonForm {...props} />
  }

  static renderTaxonEditForm(props) {
    return <EditTaxonForm {...props} />
  }

  static renderTaxonInspectView(props) {
    return <InspectTaxonView {...props} />
  }

  static renderTaxonList(props) {
    return <TaxonList {...props} />
  }

  static renderTaxonTree(props) {
    return <TaxonTree {...props} />
  }

  static renderTaxonNameCreateForm(props) {
    return <CreateTaxonNameForm {...props} />
  }

  static renderTaxonNameEditForm(props) {
    return <EditTaxonNameForm {...props} />
  }

  static renderTaxonNameInspectView(props) {
    return <InspectTaxonNameView {...props} />
  }

  static renderTaxonNameList(props) {
    return <TaxonNameList {...props} />
  }

  constructor(props) {
    super(props)
    this.handleInteraction = this.handleInteraction.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.renderTaxa = this.renderTaxa.bind(this)
    this.renderTaxonNames = this.renderTaxonNames.bind(this)
  }

  handleInteraction(type, data = {}) {
    const { routerPush } = this.props

    const { itemId } = data

    switch (type) {
      case SET_TAXON_INSPECT: {
        routerPush(`/app/taxa/${itemId}/inspect`)
        break
      }

      case SET_TAXON_NAME_INSPECT: {
        routerPush(`/app/taxonNames/${itemId}/inspect`)
        break
      }

      default: {
        break
      }
    }
  }

  handleTabChange(event, { activeIndex }) {
    if (activeIndex === 1) {
      return this.props.routerPush(`/app/taxonNames`)
    }

    return this.props.routerPush(`/app/taxa`)
  }

  renderTaxa() {
    return (
      <CrudBlocksWrapper
        dropdownFilterOptions={FILTER_OPTIONS}
        getAncestorsByParentId={
          globalSelectors.getTaxonAncestorsAcceptedTaxonNameById
        }
        itemIdParamName="taxonId"
        name="taxon"
        onInteraction={this.handleInteraction}
        renderCreateForm={TaxonomyManager.renderTaxonCreateForm}
        renderEditForm={TaxonomyManager.renderTaxonEditForm}
        renderInspectView={TaxonomyManager.renderTaxonInspectView}
        renderList={TaxonomyManager.renderTaxonList}
        renderTree={TaxonomyManager.renderTaxonTree}
        urlBasePath="/app/taxa"
      />
    )
  }

  renderTaxonNames() {
    return (
      <CrudBlocksWrapper
        dropdownFilterOptions={FILTER_OPTIONS}
        itemIdParamName="taxonNameId"
        name="taxonName"
        onInteraction={this.handleInteraction}
        renderCreateForm={TaxonomyManager.renderTaxonNameCreateForm}
        renderEditForm={TaxonomyManager.renderTaxonNameEditForm}
        renderInspectView={TaxonomyManager.renderTaxonNameInspectView}
        renderList={TaxonomyManager.renderTaxonNameList}
        urlBasePath="/app/taxonNames"
      />
    )
  }

  render() {
    const { match: { url } } = this.props

    const activeIndex = url.includes('taxonNames') ? 1 : 0

    return (
      <Tab
        activeIndex={activeIndex}
        menu={MENU_SETTINGS}
        onTabChange={this.handleTabChange}
        panes={[
          { menuItem: 'Taxa', render: this.renderTaxa },
          { menuItem: 'Taxon names', render: this.renderTaxonNames },
        ]}
      />
    )
  }
}

TaxonomyManager.propTypes = propTypes

export default compose(withRouter, connect(undefined, mapDispatchToProps))(
  TaxonomyManager
)
