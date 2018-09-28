import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setFormRef: PropTypes.func,
}
const defaultProps = {
  setFormRef: undefined,
}

class Form extends PureComponent {
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

export default Form
