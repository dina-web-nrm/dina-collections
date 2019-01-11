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
import { emToPixels } from 'coreModules/layout/utilities'
import { formModels } from '../../../../schemas'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'

const formActionBarHeight = emToPixels(4.625)

const mapDispatchToProps = {
  reset,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
  reset: PropTypes.func.isRequired,
}
const defaultProps = {
  itemSubHeader: undefined,
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
      itemHeader,
      itemSubHeader,
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
    customFormValidator({ model: 'taxonName', models: formModels })
  ),
})(EnhancedForm)
