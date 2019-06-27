/* eslint-disable react/no-unused-prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { isEmpty } from 'lodash'
import objectPath from 'object-path'
import { Form } from 'semantic-ui-react'
import { change as changeAc, getFormValues } from 'redux-form'

import FieldError from './FieldError'
import FieldLabel from './FieldLabel'
import injectParameterKey from '../../higherOrderComponents/injectParameterKey'

const mapStateToProps = (
  state,
  { deleteIfEmpty, deleteParentIfEmpty, meta: { form } = {}, name }
) => {
  if (!deleteIfEmpty && !deleteParentIfEmpty) {
    return {}
  }

  const nameParts = name.split('.')
  const indexWhereToSplitName = deleteParentIfEmpty ? -2 : -1
  const parentPath = nameParts.slice(0, indexWhereToSplitName).join('.')
  const childPath = nameParts[nameParts.length + indexWhereToSplitName]

  const formValueSelector = getFormValues(form)
  const formValues = formValueSelector(state)
  const parentFieldValue = objectPath.get(formValues, parentPath)
  const fieldValue = objectPath.get(formValues, name)
  const fieldValueIsEmpty = isEmpty(fieldValue)

  return {
    childPath,
    fieldValueIsEmpty,
    parentFieldValue,
    parentPath,
  }
}

const mapDispatchToProps = {
  change: changeAc,
}

export const propTypes = {
  change: PropTypes.func.isRequired,
  childPath: PropTypes.string,
  children: PropTypes.node,
  deleteIfEmpty: PropTypes.bool,
  deleteParentIfEmpty: PropTypes.bool,
  displayError: PropTypes.bool,
  displayLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  errorStyle: PropTypes.object,
  fieldValueIsEmpty: PropTypes.bool,
  float: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  labelKey: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool,
  }),
  model: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  module: PropTypes.string,
  name: PropTypes.string,
  parameterKey: PropTypes.string,
  parentFieldValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  parentPath: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  subLabel: PropTypes.bool,
}
export const defaultProps = {
  childPath: undefined,
  children: undefined,
  deleteIfEmpty: false,
  deleteParentIfEmpty: false,
  displayError: undefined,
  displayLabel: true,
  enableHelpNotifications: true,
  errorStyle: undefined,
  fieldValueIsEmpty: undefined,
  float: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  label: undefined,
  labelKey: undefined,
  meta: {},
  model: undefined,
  module: undefined,
  name: undefined,
  parameterKey: undefined,
  parentFieldValue: undefined,
  parentPath: undefined,
  required: false,
  style: {},
  subLabel: undefined,
}

export const fieldTemplatePropKeys = Object.keys(propTypes)

const FieldTemplate = ({
  children,
  displayError: displayErrorInput,
  displayLabel,
  enableHelpNotifications,
  errorStyle,

  float,
  helpNotificationProps,
  helpText,
  label,
  labelKey,
  meta,
  module,
  name,
  parameterKey,

  required,
  style,
  subLabel,
}) => {
  const { error, touched, warning } = meta
  const displayError =
    displayErrorInput !== undefined ? displayErrorInput : touched && !!error

  const displayWarning = touched && !!warning

  return (
    <Form.Field
      error={!!displayError}
      required={required}
      style={{
        float,
        position: 'relative',
        width: float ? '100%' : undefined,
        ...style,
      }}
    >
      {displayLabel && (
        <FieldLabel
          enableHelpNotifications={enableHelpNotifications}
          helpNotificationProps={helpNotificationProps}
          helpText={helpText}
          htmlFor={name}
          label={label}
          labelKey={labelKey}
          module={module}
          parameterKey={parameterKey}
          required={required}
          subLabel={subLabel}
        />
      )}
      {children}
      {!displayError && displayWarning && (
        <FieldError
          error={warning}
          module={module}
          parameterKey={parameterKey}
          warning
        />
      )}
      {displayError && (
        <FieldError
          error={error}
          module={module}
          parameterKey={parameterKey}
          style={errorStyle}
        />
      )}
    </Form.Field>
  )
}

FieldTemplate.propTypes = propTypes
FieldTemplate.defaultProps = defaultProps

export default compose(
  injectParameterKey,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FieldTemplate)
