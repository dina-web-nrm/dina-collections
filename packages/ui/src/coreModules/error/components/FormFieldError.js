import React from 'react'
import PropTypes from 'prop-types'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  error: PropTypes.shape({
    errorCode: PropTypes.string.isRequired,
    params: PropTypes.object,
  }).isRequired,
  module: PropTypes.string,
  scope: PropTypes.string.isRequired,
}

const defaultProps = {
  module: '',
}

const errorStyle = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  textAlign: 'left',
  transform: 'translateY(100%)',
  width: '100%',
  zIndex: 20,
}

const FormFieldError = ({ scope, error, module }) => {
  return (
    <span className="ui red tiny label" style={errorStyle}>
      {module ? (
        <ModuleTranslate
          capitalize
          modules={[module, 'error']}
          params={error.params}
          scope={scope}
          textKey={error.errorCode}
        />
      ) : (
        <ModuleTranslate
          capitalize
          module="error"
          params={error.params}
          scope={scope}
          textKey={error.errorCode}
        />
      )}
    </span>
  )
}

FormFieldError.propTypes = propTypes
FormFieldError.defaultProps = defaultProps

export default FormFieldError
