import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { arrayRemove, change, reduxForm, reset } from 'redux-form'

import { Form, FormRow } from 'coreModules/form/components'
import { emToPixels } from 'coreModules/layout/utilities'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { agentFormModels } from 'domainModules/agent/schemas'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'

const formActionBarHeight = emToPixels(4.625)

const mapDispatchToProps = {
  changeFormValue: change,
  removeArrayField: arrayRemove,
  reset,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  changeFormValue: PropTypes.func.isRequired,
  form: PropTypes.string.isRequired,
  formSectionNavigationHeader: PropTypes.node.isRequired,
  formSectionNavigationSubHeader: PropTypes.node,
  formValueSelector: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
}
const defaultProps = {
  formSectionNavigationSubHeader: undefined,
}

class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.changeFieldValue = this.changeFieldValue.bind(this)
    this.removeArrayFieldByIndex = this.removeArrayFieldByIndex.bind(this)
  }

  changeFieldValue(fieldName, value) {
    this.props.changeFormValue(this.props.form, fieldName, value)
  }

  removeArrayFieldByIndex(fieldName, index) {
    this.props.removeArrayField(this.props.form, fieldName, index)
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
      formValueSelector,
      handleSubmit,
      ...rest
    } = this.props

    return (
      <Form
        formName={form}
        onSubmit={handleSubmit(() => {
          /* submit handled in resource manager */
        })}
        sectionSpecs={sectionSpecs}
        setFormRef={this.setFormRef}
      >
        <FormRow
          {...rest}
          availableHeight={availableHeight - formActionBarHeight}
          changeFieldValue={this.changeFieldValue}
          customParts={customParts}
          formName={form}
          formSectionNavigationHeader={formSectionNavigationHeader}
          formSectionNavigationSubHeader={formSectionNavigationSubHeader}
          formValueSelector={formValueSelector}
          module="agent"
          moduleName="agent"
          removeArrayFieldByIndex={this.removeArrayFieldByIndex}
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
  validate: compose(
    customFormValidator({
      model: 'normalizedAgent',
      models: agentFormModels,
    })
  ),
})(EnhancedForm)
