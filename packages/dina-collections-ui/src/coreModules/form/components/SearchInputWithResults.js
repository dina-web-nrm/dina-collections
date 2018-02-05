import React from 'react'
import PropTypes from 'prop-types'
import { Form, Search } from 'semantic-ui-react'
import { FormFieldError } from '../../error/components'
import FieldLabel from './FieldLabel'

const propTypes = {
  errorScope: PropTypes.string,
  handleResultSelect: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string,
  required: PropTypes.bool,
  resultRenderer: PropTypes.func,
  results: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
}
const defaultProps = {
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  isLoading: false,
  label: undefined,
  module: undefined,
  required: false,
  resultRenderer: undefined,
}

function SearchInputWithResults({
  errorScope,
  handleResultSelect,
  handleSearchChange,
  helpNotificationProps,
  helpText,
  isLoading,
  input,
  label,
  meta: { error, touched },
  module,
  required,
  resultRenderer,
  results,
}) {
  // map results to fit Semantic Search propTypes
  const mappedResults = results.map(result => {
    return {
      content: result,
      title: result.title || result.key,
    }
  })

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
      <Search
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={handleSearchChange}
        resultRenderer={resultRenderer}
        results={mappedResults}
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

SearchInputWithResults.propTypes = propTypes
SearchInputWithResults.defaultProps = defaultProps

export default SearchInputWithResults
