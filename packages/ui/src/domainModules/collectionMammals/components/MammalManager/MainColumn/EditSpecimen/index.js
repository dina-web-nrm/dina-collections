import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import {
  createEnsureAllItemsFetched,
  createGetItemById,
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
    featureTypes: crudGlobalSelectors.featureType.getAll(state),
    taxonNameId: formValueSelector(
      state,
      'individual.taxonInformation.curatorialTaxonName.id'
    ),
  }
}

const mapDispatchToProps = {
  updateSpecimen: crudActionCreators.specimen.update,
}

const propTypes = {
  clearNestedCacheNamespace: PropTypes.func.isRequired,
  featureTypes: PropTypes.array.isRequired,
  featureTypesFetched: PropTypes.bool.isRequired,
  fetchOneItemById: PropTypes.func.isRequired,
  nestedItem: PropTypes.object,
  updateSpecimen: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: null,
}

class EditSpecimen extends PureComponent {
  render() {
    const {
      clearNestedCacheNamespace,
      fetchOneItemById,
      nestedItem,
      updateSpecimen,
      featureTypes,
      featureTypesFetched,
      ...rest
    } = this.props

    if (!nestedItem || !featureTypesFetched) {
      return null
    }

    const { resourceActivities, ...initialValues } = setDefaultValues({
      featureTypes,
      specimen: nestedItem || {},
    })
    log.render()
    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        {...rest}
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
            throwError: true,
          }).then(({ id }) => {
            return fetchOneItemById(id).then(() => {
              return { id }
            })
          })
        }}
        initialValues={initialValues}
        loading={!nestedItem}
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
      'taxonNames',
    ],
    relationships: ['all'],
    resolveRelationships: [
      'physicalObject',
      'storageLocation',
      'resourceActivity',
    ],
    resource: 'specimen',
  }),
  createEnsureAllItemsFetched({
    allFetchedKey: 'featureTypesFetched',
    resource: 'featureType',
  }),
  createEnsureAllItemsFetched({ resource: 'customTaxonNameType' }),
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  createEnsureAllItemsFetched({
    resource: 'preparationType',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  createGetItemById({
    idPath: 'taxonNameId',
    itemKey: 'taxonName',
    resource: 'taxonName',
  })
)(EditSpecimen)
