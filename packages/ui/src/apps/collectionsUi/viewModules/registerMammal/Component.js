import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators as mammalActionCreators } from 'domainModules/collectionMammals'
import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
// import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapDispatchToProps = {
  registerMammal: mammalActionCreators.registerMammal,
}

const propTypes = {
  registerMammal: PropTypes.func.isRequired,
}

const RegisterMammal = ({ registerMammal }) => {
  const initialData = transformInput({})
  return (
    <PageTemplate>
      <MammalForm
        handleFormSubmit={registerMammal}
        initialData={initialData}
        mode="register"
        redirectOnSuccess
      />
    </PageTemplate>
  )
}

RegisterMammal.propTypes = propTypes

export default connect(null, mapDispatchToProps)(RegisterMammal)
