import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { BlockLoader } from 'coreModules/crudBlocks/components'
import DropdownSearchLocalInput from 'coreModules/form/components/inputs/DropdownSearch/Local'
import * as actionCreators from 'dataModules/taxonService/actionCreators'

import {
  createGetItemById,
  createEnsureAllItemsFetched,
} from 'coreModules/crud/higherOrderComponents'

import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'
import RelatedTaxonNamesTable from '../RelatedTaxonNamesTable'
import BaseForm from './Base'
import { ACCEPTED, SYNONYM, VERNACULAR } from '../../../../constants'
import globalSelectors from '../../../../globalSelectors'

const mapStateToProps = state => {
  return {
    taxonNameOptions: globalSelectors.getTaxonNameOptions(state),
  }
}

const mapDispatchToProps = {
  updateTaxonNameAcceptedToTaxon: actionCreators.updateTaxonNameAcceptedToTaxon,
  updateTaxonNameSynonymToTaxon: actionCreators.updateTaxonNameSynonymToTaxon,
  updateTaxonNameVernacularToTaxon:
    actionCreators.updateTaxonNameVernacularToTaxon,
  updateTaxonParent: actionCreators.updateTaxonParent,
}

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  taxon: PropTypes.object,
  taxonNameOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  updateTaxonNameAcceptedToTaxon: PropTypes.func.isRequired,
  updateTaxonNameSynonymToTaxon: PropTypes.func.isRequired,
  updateTaxonNameVernacularToTaxon: PropTypes.func.isRequired,
  updateTaxonParent: PropTypes.func.isRequired,
}

const defaultProps = {
  allTaxonNamesFetched: undefined,
  taxon: undefined,
  taxonNameOptions: [],
}

export class Edit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { taxonNameIdToAdd: '' }

    this.handleChangeFromAcceptedToSynonym = this.handleChangeFromAcceptedToSynonym.bind(
      this
    )
    this.handleChangeFromSynonymToAccepted = this.handleChangeFromSynonymToAccepted.bind(
      this
    )
    this.handleDisconnectTaxonNameFromTaxon = this.handleDisconnectTaxonNameFromTaxon.bind(
      this
    )
  }

  handleChangeFromAcceptedToSynonym(event, { taxonId, taxonNameId }) {
    event.preventDefault()
    return this.props
      .updateTaxonNameAcceptedToTaxon({
        taxonId: null,
        taxonNameId,
        throwError: true,
      })
      .then(() => {
        return this.props.updateTaxonNameSynonymToTaxon({
          taxonId,
          taxonNameId,
        })
      })
  }

  handleChangeFromSynonymToAccepted(event, { taxonId, taxonNameId }) {
    event.preventDefault()
    return this.props
      .updateTaxonNameSynonymToTaxon({
        taxonId: null,
        taxonNameId,
        throwError: true,
      })
      .then(() => {
        return this.props.updateTaxonNameAcceptedToTaxon({
          taxonId,
          taxonNameId,
        })
      })
  }

  handleDisconnectTaxonNameFromTaxon(event, { nameType, taxonNameId }) {
    event.preventDefault()
    switch (nameType) {
      case ACCEPTED: {
        this.props.updateTaxonNameAcceptedToTaxon({
          taxonId: null,
          taxonNameId,
          throwError: true,
        })
        break
      }
      case SYNONYM: {
        this.props.updateTaxonNameSynonymToTaxon({
          taxonId: null,
          taxonNameId,
          throwError: true,
        })
        break
      }
      case VERNACULAR: {
        this.props.updateTaxonNameVernacularToTaxon({
          taxonId: null,
          taxonNameId,
          throwError: true,
        })
        break
      }
      default: {
        break
      }
    }
  }

  render() {
    const {
      allTaxonNamesFetched,
      itemId,
      onInteraction,
      taxon,
      taxonNameOptions,
    } = this.props

    if (!taxon || !allTaxonNamesFetched) {
      return <BlockLoader />
    }

    const initialValues = taxon &&
      taxon.parent && {
        parentId: taxon.parent.id,
      }

    return (
      <React.Fragment>
        <BaseForm
          displayBackButton
          displayResetButton
          initialValues={initialValues}
          onClose={event => {
            event.preventDefault()
            onInteraction(FORM_CANCEL)
          }}
          onInteraction={onInteraction}
          onSubmit={({ parentId }) => {
            this.props
              .updateTaxonParent({
                parentId,
                taxonId: itemId,
              })
              .then(result => {
                onInteraction(FORM_EDIT_SUCCESS, {
                  itemId: result.id,
                })
              })
          }}
        />

        <h2>Taxon names</h2>
        <RelatedTaxonNamesTable
          onChangeFromAcceptedToSynonym={this.handleChangeFromAcceptedToSynonym}
          onChangeFromSynonymToAccepted={this.handleChangeFromSynonymToAccepted}
          onDisconnect={this.handleDisconnectTaxonNameFromTaxon}
          onInteraction={onInteraction}
          taxon={taxon}
        />
        <DropdownSearchLocalInput
          initialText="Connect taxon name"
          input={{
            name: 'connectTaxonName',
            onBlur: value => {
              this.setState({ taxonNameIdToAdd: value })
            },
            onChange: value => {
              this.setState({ taxonNameIdToAdd: value })
            },
            value: this.state.taxonNameIdToAdd,
          }}
          options={taxonNameOptions}
        />
        <Button>Connect</Button>
      </React.Fragment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxonNamesFetched',
    resource: 'taxonName',
  }),
  createGetItemById({
    itemKey: 'taxon',
    resource: 'taxon',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Edit)
