import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { MammalForm } from 'domainModules/collectionMammals/components'
import setDefaultValues from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import nestedToCore from 'common/es5/formatObject/nestedToCore'
import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'

const log = createLog('modules:editMammal:Component')

const mapDispatchToProps = {
  updateSpecimen: crudActionCreators.specimen.update,
}

const propTypes = {
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     specimenId: PropTypes.string.isRequired,
  //   }).isRequired,
  // }).isRequired,
  nestedItem: PropTypes.object.isRequired,
  updateSpecimen: PropTypes.func.isRequired,
}

class EditMammal extends Component {
  render() {
    const { nestedItem, updateSpecimen } = this.props

    const initialValues = setDefaultValues({ specimen: nestedItem || {} })
    log.render()
    log.debug('initialValues', initialValues)
    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={formOutput => {
            const item = nestedToCore({
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

EditMammal.propTypes = propTypes

export default compose(
  createGetNestedItemById({
    idPath: 'match.params.specimenId',
    include: ['featureTypes', 'physicalObjects', 'places', 'taxa'],
    relationships: ['all'],
    resolveRelationships: ['physicalObject'],
    resource: 'specimen',
  }),
  connect(null, mapDispatchToProps)
)(EditMammal)
