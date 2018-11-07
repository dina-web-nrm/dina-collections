import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { withUnsavedChangesConfirmation } from 'coreModules/form/higherOrderComponents'
import { actionCreators } from 'coreModules/formSupport/keyObjectModule'
import { transformFormSpecToFieldMap } from 'coreModules/formSupport/utilities'

const mapDispatchToProps = { setFormSpec: actionCreators.set[':formName'] }

const propTypes = {
  children: PropTypes.node.isRequired,
  dirty: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
  formName: PropTypes.string.isRequired,
  getAllowTransition: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onSubmit: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  setFormRef: PropTypes.func,
  setFormSpec: PropTypes.func.isRequired,
  unsavedChangesMessage: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
}
const defaultProps = {
  getAllowTransition: undefined,
  setFormRef: undefined,
  unsavedChangesMessage: undefined,
}

class Form extends PureComponent {
  componentWillMount() {
    const { formName, setFormSpec, sectionSpecs } = this.props

    setFormSpec(transformFormSpecToFieldMap(sectionSpecs), {
      formName,
    })
  }

  render() {
    const { children, onSubmit: handleSubmit, setFormRef } = this.props

    return (
      <form className="ui form" onSubmit={handleSubmit} ref={setFormRef}>
        {children}
      </form>
    )
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default compose(
  withUnsavedChangesConfirmation({
    unsavedChangesMessage:
      'You have unsaved changes, are you sure you want to leave?',
  }),
  connect(undefined, mapDispatchToProps)
)(Form)
