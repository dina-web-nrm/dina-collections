import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'
import objectPath from 'object-path'

import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import {
  createEnsureAllItemsFetched,
  createGetNestedItemById,
} from 'coreModules/crud/higherOrderComponents'
import collectionMammalsSelectors from 'domainModules/collectionMammals/globalSelectors'
import setDefaultValues from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:collectionMammals:components:MammalManager:EditSpecimen'
)

const FORM_NAME = 'editSpecimen'

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapStateToProps = state => {
  return {
    catalogNumber: collectionMammalsSelectors.createGetCatalogNumber(FORM_NAME)(
      state
    ),
    establishmentMeansTypes: crudGlobalSelectors.establishmentMeansType.getAll(
      state
    ),
    featureTypes: crudGlobalSelectors.featureType.getAll(state),
    identifierTypes: crudGlobalSelectors.identifierType.getAll(state),
  }
}

const mapDispatchToProps = {
  updateSpecimen: crudActionCreators.specimen.update,
}

const propTypes = {
  clearNestedCacheNamespace: PropTypes.func.isRequired,
  establishmentMeansTypes: PropTypes.array.isRequired,
  featureTypes: PropTypes.array.isRequired,
  featureTypesFetched: PropTypes.bool.isRequired,
  fetchOneItemById: PropTypes.func.isRequired,
  identifierTypes: PropTypes.array.isRequired,
  nestedSpecimen: PropTypes.object,
  updateSpecimen: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedSpecimen: null,
}

class EditSpecimen extends PureComponent {
  render() {
    log.render()

    const {
      clearNestedCacheNamespace,
      establishmentMeansTypes,
      fetchOneItemById,
      identifierTypes,
      nestedSpecimen,
      updateSpecimen,
      featureTypes,
      featureTypesFetched,
      ...rest
    } = this.props

    if (!nestedSpecimen || !featureTypesFetched) {
      return null
    }

    const curatorialTaxon = objectPath.get(
      nestedSpecimen,
      'individual.taxonInformation.curatorialTaxon'
    )

    const { resourceActivities, ...initialValues } = setDefaultValues({
      establishmentMeansTypes,
      featureTypes,
      identifierTypes,
      specimen: nestedSpecimen || {},
    })

    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        {...rest}
        curatorialTaxon={curatorialTaxon}
        establishmentMeansTypes={establishmentMeansTypes}
        form={FORM_NAME}
        formName={FORM_NAME}
        formValueSelector={formValueSelector}
        handleFormSubmit={formOutput => {
          const item = nestedToCoreSync({
            item: formOutput,
            type: 'specimen',
          })
          return updateSpecimen({
            item,
          }).then(({ id }) => {
            return fetchOneItemById(id).then(() => {
              return { id }
            })
          })
        }}
        initialValues={initialValues}
        itemId={nestedSpecimen.id}
        loading={!nestedSpecimen}
        mode="edit"
        resourceActivities={resourceActivities}
      />
    )
  }
}

EditSpecimen.propTypes = propTypes
EditSpecimen.defaultProps = defaultProps

export default compose(
  withRouter,
  createGetNestedItemById({
    idPath: 'match.params.specimenId',
    include: [
      'featureTypes',
      'normalizedAgents',
      'physicalObjects.storageLocation',
      'places',
      'resourceActivities',
      'taxa.acceptedTaxonName',
      'taxonNames',
    ],
    nestedItemKey: 'nestedSpecimen',
    relationships: ['all'],
    resolveRelationships: [
      'physicalObject',
      'storageLocation',
      'resourceActivity',
      'taxon',
      'taxonName',
    ],
    resource: 'specimen',
  }),
  createEnsureAllItemsFetched({
    allFetchedKey: 'featureTypesFetched',
    resource: 'featureType',
  }),
  createEnsureAllItemsFetched({
    resource: 'establishmentMeansType',
  }),
  createEnsureAllItemsFetched({ resource: 'customTaxonNameType' }),
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  createEnsureAllItemsFetched({
    resource: 'preparationType',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditSpecimen)
