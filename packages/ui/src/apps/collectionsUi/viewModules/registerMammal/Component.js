import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators as mammalActionCreators } from 'domainModules/collectionMammals'
import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapDispatchToProps = {
  createSpecimen: mammalActionCreators.createSpecimen,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
}

const RegisterMammal = ({ createSpecimen }) => {
  const initialData = transformInput({})
  return (
    <PageTemplate>
      <MammalForm
        handleFormSubmit={formOutput => {
          return createSpecimen(transformOutput(formOutput))
        }}
        initialData={initialData}
        mode="register"
        redirectOnSuccess
      />
    </PageTemplate>
  )
}

RegisterMammal.propTypes = propTypes

export default connect(null, mapDispatchToProps)(RegisterMammal)
