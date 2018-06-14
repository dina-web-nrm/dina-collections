import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import setDefaultValues from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import { MammalForm } from 'domainModules/collectionMammals/components'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const log = createLog('modules:editMammal:Component')

const mapStateToProps = state => {
  return {
    featureTypes: crudGlobalSelectors.featureType.getAll(state),
  }
}

const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
}

class RegisterMammal extends Component {
  render() {
    const { createSpecimen } = this.props
    const initialValues = setDefaultValues({ specimen: {} })

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
