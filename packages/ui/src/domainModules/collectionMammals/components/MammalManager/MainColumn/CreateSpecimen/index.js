import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import createLog from 'utilities/log'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import crudActionCreators from 'coreModules/crud/actionCreators'
import setDefaultValues from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:collectionMammals:components:MammalManager:CreateSpecimen'
)

const FORM_NAME = 'editSpecimen'

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
}

class CreateSpecimen extends PureComponent {
  render() {
    const { createSpecimen, ...rest } = this.props
    const initialValues = setDefaultValues({ specimen: {} })

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        form={FORM_NAME}
        formName={FORM_NAME}
        formValueSelector={formValueSelector}
        handleFormSubmit={formOutput => {
          const item = nestedToCoreSync({
            item: formOutput,
            type: 'specimen',
          })
          return createSpecimen({ item, throwError: true })
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
