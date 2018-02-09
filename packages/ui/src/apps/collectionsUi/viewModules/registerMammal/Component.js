import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators as mammalActionCreators } from 'domainModules/collectionMammals'
import { MammalForm } from 'domainModules/collectionMammals/components'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapDispatchToProps = {
  registerMammal: mammalActionCreators.registerMammal,
}

const propTypes = {
  registerMammal: PropTypes.func.isRequired,
}

const RegisterMammal = ({ registerMammal }) => (
  <PageTemplate>
    <MammalForm
      handleFormSubmit={registerMammal}
      mode="register"
      redirectOnSuccess
    />
  </PageTemplate>
)

RegisterMammal.propTypes = propTypes

export default connect(null, mapDispatchToProps)(RegisterMammal)
