import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  formValueSelector as formValueSelectorFactory,
  reduxForm,
} from 'redux-form'

import formValidator from 'common/es5/error/validators/formValidator'
import { Form, FormRow } from 'coreModules/form/components'
import { emToPixels } from 'coreModules/layout/utilities'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'

const formActionBarHeight = emToPixels(4.625)

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  formSectionNavigationHeader: PropTypes.node.isRequired,
  formSectionNavigationSubHeader: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
}
const defaultProps = {
  formSectionNavigationSubHeader: undefined,
}

class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(props.form)
  }

  render() {
    const {
      availableHeight,
      form,
      formSectionNavigationHeader,
      formSectionNavigationSubHeader,
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
          formSectionNavigationHeader={formSectionNavigationHeader}
          formSectionNavigationSubHeader={formSectionNavigationSubHeader}
          formValueSelector={this.formValueSelector}
          module="storage"
          moduleName="storage"
          sectionSpecs={sectionSpecs}
        />
      </Form>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default reduxForm({
  enableReinitialize: true,
  validate: formValidator({ model: 'storageLocation' }),
})(BaseForm)
