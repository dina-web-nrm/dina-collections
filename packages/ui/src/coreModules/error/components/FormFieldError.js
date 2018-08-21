import React from 'react'
import PropTypes from 'prop-types'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  error: PropTypes.shape({
    errorCode: PropTypes.string.isRequired,
    params: PropTypes.object,
  }).isRequired,
  module: PropTypes.string,
  scope: PropTypes.string,
  textKeys: PropTypes.array,
  warning: PropTypes.bool,
}

const defaultProps = {
  module: '',
  scope: undefined,
  textKeys: [],
  warning: false,
}

const errorStyle = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  textAlign: 'left',
  transform: 'translateY(100%)',
  zIndex: 20,
}

const FormFieldError = ({ scope, error, module, textKeys, warning }) => {
  if (textKeys.length) {
    return (
      <span className="ui red tiny label" style={errorStyle}>
        <ModuleTranslate capitalize params={error.params} textKeys={textKeys} />
      </span>
    )
  }

  const classNames = warning ? 'ui orange tiny label' : 'ui red tiny label'

  return (
    <span className={classNames} style={errorStyle}>
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
