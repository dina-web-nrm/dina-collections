import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import {
  formValueSelector as formValueSelectorFactory,
  reduxForm,
} from 'redux-form'

import customFormValidator from 'common/es5/error/validators/customFormValidator'
import { Form, FormRow } from 'coreModules/form/components'
import {
  createMapRequiredStrings,
  mapParentError,
} from 'coreModules/form/utilities/errorTransformations'
import { emToPixels } from 'coreModules/layout/utilities'
import { formModels } from '../../../../schemas'
import customParts from '../../../formParts'
import sectionSpecs from './sectionSpecs'

const formActionBarHeight = emToPixels(4.625)

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
}
const defaultProps = {
  itemSubHeader: undefined,
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

export default reduxForm({
  enableReinitialize: true,
  validate: compose(
    mapParentError,
    createMapRequiredStrings(['group', 'name']),
    customFormValidator({
      model: 'place',
      models: formModels,
    })
  ),
})(BaseForm)
