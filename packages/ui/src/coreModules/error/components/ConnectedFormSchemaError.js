import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFormSyncErrors } from 'redux-form'

import FormSchemaError from './FormSchemaError'

const mapStateToProps = (state, { form }) => {
  const syncErrors = getFormSyncErrors(form)(state)

  return {
    // TODO: make this dynamic
    errors: syncErrors && syncErrors.schemaErrors,
  }
}

const propTypes = {
  errors: PropTypes.array,
  form: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
}
const defaultProps = {
  errors: undefined,
}

const ConnectedFormSchemaError = ({ errors }) => {
  if (errors && errors.length > 0) {
    return <FormSchemaError errors={errors} />
  }

  return null
}

ConnectedFormSchemaError.propTypes = propTypes
ConnectedFormSchemaError.defaultProps = defaultProps

export default connect(mapStateToProps)(ConnectedFormSchemaError)
