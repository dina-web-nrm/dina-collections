import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import createLog from 'utilities/log'

const log = createLog(
  'coreModules:form:higherOrderComponents:reportFormFieldStatus'
)

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    dirty: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
  }).isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
}

const reportFormFieldStatus = ComposedComponent => {
  class FormFieldStatusReporter extends PureComponent {
    componentWillReceiveProps(nextProps) {
      const { input: { name }, setChildDirty, setChildInvalid } = this.props

      if (this.props.meta.dirty !== nextProps.meta.dirty) {
        const newValue = nextProps.meta.dirty
        log.debug(`setChildDirty ${name}`, newValue)
        setChildDirty(name, newValue)
      }

      if (this.props.meta.invalid !== nextProps.meta.invalid) {
        const newValue = nextProps.meta.invalid
        log.debug(`setChildInvalid ${name}`, newValue)
        setChildInvalid(name, newValue)
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  FormFieldStatusReporter.propTypes = propTypes

  return FormFieldStatusReporter
}

export default reportFormFieldStatus
