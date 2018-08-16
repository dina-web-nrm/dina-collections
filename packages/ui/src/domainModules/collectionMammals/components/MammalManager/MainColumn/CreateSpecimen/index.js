import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import crudActionCreators from 'coreModules/crud/actionCreators'
import setDefaultValues from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:collectionMammals:components:MammalManager:CreateSpecimen'
)

const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
}

class CreateSpecimen extends Component {
  render() {
    const { createSpecimen, ...rest } = this.props
    const initialValues = setDefaultValues({ specimen: {} })

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        form="createSpecimen"
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
        {...rest}
      />
    )
  }
}

CreateSpecimen.propTypes = propTypes

export default connect(undefined, mapDispatchToProps)(CreateSpecimen)
