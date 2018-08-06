import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { MammalForm } from 'domainModules/collectionMammals/components'
import setDefaultValues from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

const log = createLog('modules:collectionMammals:components:EditSpecimen')

const mapStateToProps = state => {
  return {
    featureTypes: crudGlobalSelectors.featureType.getAll(state),
  }
}

const mapDispatchToProps = {
  updateSpecimen: crudActionCreators.specimen.update,
}

const propTypes = {
  featureTypes: PropTypes.array.isRequired,
  nestedItem: PropTypes.object,
  specimenId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  updateSpecimen: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: null,
}

class EditSpecimen extends Component {
  render() {
    const { nestedItem, updateSpecimen, featureTypes } = this.props

    const initialValues = setDefaultValues({
      featureTypes,
      specimen: nestedItem || {},
    })
    log.render()
    log.debug('initialValues', initialValues)
    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={formOutput => {
            const item = nestedToCoreSync({
              item: formOutput,
              type: 'specimen',
            })
            return updateSpecimen({
              item,
            })
          }}
          initialValues={initialValues}
          mode="edit"
        />
      </PageTemplate>
    )
  }
}

EditSpecimen.propTypes = propTypes
EditSpecimen.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    idPath: 'specimenId',
    include: [
      'agents',
      'featureTypes',
      'physicalObjects.storageLocation',
      'places',
      'taxonNames',
    ],
    relationships: ['all'],
    resolveRelationships: ['physicalObject'],
    resource: 'specimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditSpecimen)
