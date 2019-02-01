import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  formValueSelector as formValueSelectorFactory,
  reduxForm,
  reset,
} from 'redux-form'

import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { Form, FormRow } from 'coreModules/form/components'
import { mapParentError } from 'coreModules/form/utilities/errorTransformations'
import { emToPixels } from 'coreModules/layout/utilities'
import { formModels } from '../../../../schemas'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'
import { mapAcceptedTaxonNameError } from './transformations/syncErrors'

const formActionBarHeight = emToPixels(4.625)

const mapDispatchToProps = {
  reset,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  getAllowTransition: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
  preventLeavingForm: PropTypes.bool,
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
    this.formValueSelector = formValueSelectorFactory(props.form)
  }

  handleUndoChanges() {
    this.props.reset(this.props.form)
  }

  render() {
    const {
      availableHeight,
      form,
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
          customParts={customParts}
          formName={form}
          formValueSelector={this.formValueSelector}
          itemHeader={itemHeader}
          itemSubHeader={itemSubHeader}
          module="taxon"
          moduleName="taxon"
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
    mapAcceptedTaxonNameError,
    mapParentError,
    customFormValidator({
      model: 'taxon',
      models: formModels,
    })
  ),
})(EnhancedForm)
