import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { actionCreators } from 'coreModules/formSupport/keyObjectModule'
import { transformFormSpecToFieldMap } from 'coreModules/formSupport/utilities'

const mapDispatchToProps = { setFormSpec: actionCreators.set[':formName'] }

const propTypes = {
  children: PropTypes.node.isRequired,
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  setFormRef: PropTypes.func,
  setFormSpec: PropTypes.func.isRequired,
}
const defaultProps = {
  setFormRef: undefined,
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
      <form onSubmit={handleSubmit} ref={setFormRef}>
        {children}
      </form>
    )
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps

export default compose(connect(undefined, mapDispatchToProps))(Form)
