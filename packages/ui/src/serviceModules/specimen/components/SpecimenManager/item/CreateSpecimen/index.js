import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import createLog from 'utilities/log'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import { createGetResourceCount } from 'coreModules/crud/higherOrderComponents'
import transformInput, {
  getBaseValues,
} from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:specimen:components:MammalManager:CreateSpecimen'
)

const FORM_NAME = 'specimenCreate'

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapStateToProps = state => {
  return {
    establishmentMeansTypes: crudGlobalSelectors.establishmentMeansType.getAll(
      state
    ),
    identifierTypes: crudGlobalSelectors.identifierType.getAll(state),
  }
}
const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
  establishmentMeansTypes: PropTypes.array,
  fetchResourceCount: PropTypes.func.isRequired,
  identifierTypes: PropTypes.array,
  navigateEdit: PropTypes.func.isRequired,
}
const defaultProps = {
  establishmentMeansTypes: [],
  identifierTypes: [],
}

class CreateSpecimen extends PureComponent {
  render() {
    log.render()

    const {
      createSpecimen,
      establishmentMeansTypes,
      fetchResourceCount,
      identifierTypes,
      navigateEdit,
      ...rest
    } = this.props

    if (!establishmentMeansTypes.length || !identifierTypes.length) {
      return null
    }

    const baseValues = getBaseValues({
      establishmentMeansTypes,
      identifierTypes,
    })

    const initialValues = transformInput({
      establishmentMeansTypes,
      identifierTypes,
      specimen: {},
    })

    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        {...rest}
        baseValues={baseValues}
        establishmentMeansTypes={establishmentMeansTypes}
        form={FORM_NAME}
        formName={FORM_NAME}
        formValueSelector={formValueSelector}
        initialValues={initialValues}
        mode="register"
        redirectOnSuccess
      />
    )
  }
}

CreateSpecimen.propTypes = propTypes
CreateSpecimen.defaultProps = defaultProps

export default compose(
  createGetResourceCount({ resource: 'specimen' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CreateSpecimen)
