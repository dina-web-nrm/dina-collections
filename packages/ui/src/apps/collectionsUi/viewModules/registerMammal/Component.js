import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
// import { actionCreators as specimenActionCreators } from 'dataModules/specimenService'
import { MammalForm } from 'domainModules/collectionMammals/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
// import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import { globalSelectors as mammalSelectors } from 'domainModules/collectionMammals'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const log = createLog('modules:editMammal:Component')

const mapStateToProps = state => {
  return {
    initialValues: mammalSelectors.getMammalFormInitialValues(state),
  }
}
const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
}

class RegisterMammal extends Component {
  render() {
    const { createSpecimen, initialValues } = this.props

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={formOutput => {
            return createSpecimen({ item: formOutput })
          }}
          initialValues={initialValues}
          mode="register"
          redirectOnSuccess
        />
      </PageTemplate>
    )
  }
}

RegisterMammal.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMammal)
