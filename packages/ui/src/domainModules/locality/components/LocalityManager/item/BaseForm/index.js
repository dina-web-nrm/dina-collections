import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'

import formValidator from 'common/es5/error/validators/formValidator'
import { Form, FormRow } from 'coreModules/form/components'
import { emToPixels } from 'coreModules/layout/utilities'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'

const formActionBarHeight = emToPixels(4.625)

const mapDispatchToProps = {
  reset,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  formSectionNavigationHeader: PropTypes.node.isRequired,
  formSectionNavigationSubHeader: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}
const defaultProps = {
  formSectionNavigationSubHeader: undefined,
}

class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
  }

  handleUndoChanges() {
    this.props.reset(this.props.form)
  }

  render() {
    const {
      availableHeight,
      form,
      formSectionNavigationHeader,
      formSectionNavigationSubHeader,
      handleSubmit,
      onSubmit,
    } = this.props

    return (
      <Form
        formName={form}
        onSubmit={handleSubmit(onSubmit)}
        sectionSpecs={sectionSpecs}
        setFormRef={this.setFormRef}
      >
        <FormRow
          availableHeight={availableHeight - formActionBarHeight}
          customParts={customParts}
          formName={form}
          formSectionNavigationHeader={formSectionNavigationHeader}
          formSectionNavigationSubHeader={formSectionNavigationSubHeader}
          module="locality"
          moduleName="locality"
          sectionSpecs={sectionSpecs}
        />
      </Form>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

const EnhancedForm = compose(connect(undefined, mapDispatchToProps))(BaseForm)

export default reduxForm({
  enableReinitialize: true,
  validate: formValidator({ model: 'place' }),
})(EnhancedForm)
