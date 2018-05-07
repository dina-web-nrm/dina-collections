import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import nestedToCore from 'common/es5/formatObject/nestedToCore'
import { MammalForm } from 'domainModules/collectionMammals/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
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
            const item = nestedToCore({
              item: formOutput,
              type: 'specimen',
            })
            return createSpecimen({ item })
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
