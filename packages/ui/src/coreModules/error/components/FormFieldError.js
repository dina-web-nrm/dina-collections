import React from 'react'
import PropTypes from 'prop-types'
import { ModuleTranslate } from 'coreModules/i18n/components'

const defaultErrorStyle = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  textAlign: 'left',
  transform: 'translateY(100%)',
  zIndex: 20,
}

const propTypes = {
  error: PropTypes.shape({
    errorCode: PropTypes.string.isRequired,
    params: PropTypes.object,
  }).isRequired,
  module: PropTypes.string,
  scope: PropTypes.string,
  style: PropTypes.object,
  textKeys: PropTypes.array,
  warning: PropTypes.bool,
}

const defaultProps = {
  module: '',
  scope: undefined,
  style: defaultErrorStyle,
  textKeys: [],
  warning: false,
}

const FormFieldError = ({ scope, error, module, style, textKeys, warning }) => {
  if (textKeys.length) {
    return (
      <span className="ui red tiny label" style={style}>
        <ModuleTranslate capitalize params={error.params} textKeys={textKeys} />
      </span>
    )
  }

  const classNames = warning ? 'ui orange tiny label' : 'ui red tiny label'

  return (
    <span className={classNames} style={style}>
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
