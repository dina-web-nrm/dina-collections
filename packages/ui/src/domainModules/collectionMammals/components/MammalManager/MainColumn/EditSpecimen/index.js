import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import setDefaultValues from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:collectionMammals:components:MammalManager:EditSpecimen'
)

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
  updateSpecimen: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: null,
}

class EditSpecimen extends PureComponent {
  render() {
    const { nestedItem, updateSpecimen, featureTypes, ...rest } = this.props

    const initialValues = setDefaultValues({
      featureTypes,
      specimen: nestedItem || {},
    })
    log.render()
    log.debug('initialValues', initialValues)

    return (
      <RecordForm
        form="editSpecimen"
        handleFormSubmit={formOutput => {
          const item = nestedToCoreSync({
            item: formOutput,
            type: 'specimen',
          })
          return updateSpecimen({
            item,
            throwError: true,
          })
        }}
        initialValues={initialValues}
        loading={!nestedItem}
        mode="edit"
        {...rest}
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
      'taxonNames',
    ],
    relationships: ['all'],
    resolveRelationships: ['physicalObject'],
    resource: 'specimen',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(EditSpecimen)
