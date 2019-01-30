import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { arrayRemove, change, reduxForm, reset } from 'redux-form'

import { createLinkFieldErrors } from 'coreModules/form/higherOrderComponents'
import { Form, FormRow } from 'coreModules/form/components'
import { createMapRequiredStrings } from 'coreModules/form/utilities/errorTransformations'
import { emToPixels } from 'coreModules/layout/utilities'
import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { formModels } from '../../../../schemas'
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
  formValueSelector: PropTypes.func.isRequired,
  getAllowTransition: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
  preventLeavingForm: PropTypes.bool,
  removeArrayField: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  unsavedChangesMessage: PropTypes.string,
}
const defaultProps = {
  getAllowTransition: undefined,
  itemSubHeader: undefined,
  preventLeavingForm: false,
  unsavedChangesMessage: undefined,
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
      formValueSelector,
      getAllowTransition,
      handleSubmit,
      itemHeader,
      itemSubHeader,
      preventLeavingForm,
      unsavedChangesMessage,
      ...rest
    } = this.props

    return (
      <Form
        formName={form}
        getAllowTransition={getAllowTransition}
        onSubmit={handleSubmit(() => {
          /* submit handled in resource manager */
        })}
        preventLeavingForm={preventLeavingForm}
        sectionSpecs={sectionSpecs}
        setFormRef={this.setFormRef}
        unsavedChangesMessage={unsavedChangesMessage}
      >
        <FormRow
          {...rest}
          availableHeight={availableHeight - formActionBarHeight}
          changeFieldValue={this.changeFieldValue}
          customParts={customParts}
          formName={form}
          formValueSelector={formValueSelector}
          itemHeader={itemHeader}
          itemSubHeader={itemSubHeader}
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

export default compose(
  reduxForm({
    enableReinitialize: true,
    validate: compose(
      createMapRequiredStrings(['agentType', 'fullName']),
      customFormValidator({
        model: 'normalizedAgent',
        models: formModels,
      })
    ),
  }),
  createLinkFieldErrors({
    fieldPaths: ['fullName', 'disambiguatingDescription'],
  })
)(EnhancedForm)
