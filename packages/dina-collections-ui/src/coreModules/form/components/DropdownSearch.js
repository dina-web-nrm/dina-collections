import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Form } from 'semantic-ui-react'

import { FormFieldError } from '../../error/components'
import FieldLabel from './FieldLabel'

const propTypes = {
  autoComplete: PropTypes.string,
  errorScope: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  required: PropTypes.bool,
  selectOnBlur: PropTypes.bool,
}
const defaultProps = {
  autoComplete: undefined,
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  initialText: undefined,
  label: undefined,
  module: undefined,
  required: false,
  selectOnBlur: undefined,
}

function DropdownSearch({
  autoComplete,
  errorScope,
  helpNotificationProps,
  helpText,
  initialText,
  input,
  label,
  meta: { error, touched },
  module,
  onChange,
  onSearchChange,
  options,
  required,
  selectOnBlur,
}) {
  const displayError = touched && !!error

  return (
    <Form.Field
      error={displayError}
      required={required}
      style={{ position: 'relative' }}
    >
      {(label || helpNotificationProps) && (
        <FieldLabel
          helpNotificationProps={helpNotificationProps}
          helpText={helpText}
          htmlFor={input.name}
          label={label}
        />
      )}
      {helpText && <p>{helpText}</p>}
      <Dropdown
        autoComplete={autoComplete}
        onChange={onChange}
        onSearchChange={onSearchChange}
        options={options}
        search
        selection
        selectOnBlur={selectOnBlur}
        selectOnNavigation={false}
        text={input.value || initialText}
        {...input}
      />
      {displayError && (
        <FormFieldError
          error={error}
          module={module}
          scope={errorScope || input.name}
        />
      )}
    </Form.Field>
  )
}

DropdownSearch.propTypes = propTypes
DropdownSearch.defaultProps = defaultProps

export default DropdownSearch
