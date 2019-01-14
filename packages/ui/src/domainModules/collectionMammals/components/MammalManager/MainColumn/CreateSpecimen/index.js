import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import createLog from 'utilities/log'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudGlobalSelectors from 'coreModules/crud/globalSelectors'
import {
  createEnsureAllItemsFetched,
  createGetResourceCount,
} from 'coreModules/crud/higherOrderComponents'
import { CREATE_SUCCESS } from 'coreModules/resourceManager/constants'
import setDefaultValues from '../RecordForm/transformations/input'
import RecordForm from '../RecordForm'

const log = createLog(
  'modules:collectionMammals:components:MammalManager:CreateSpecimen'
)

const FORM_NAME = 'createSpecimen'

const formValueSelector = formValueSelectorFactory(FORM_NAME)

const mapStateToProps = state => {
  return {
    identifierTypes: crudGlobalSelectors.identifierType.getAll(state),
  }
}
const mapDispatchToProps = {
  createSpecimen: crudActionCreators.specimen.create,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
  fetchResourceCount: PropTypes.func.isRequired,
  identifierTypes: PropTypes.array.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

class CreateSpecimen extends PureComponent {
  render() {
    const {
      createSpecimen,
      fetchResourceCount,
      identifierTypes,
      onInteraction,
      ...rest
    } = this.props
    const initialValues = setDefaultValues({ identifierTypes, specimen: {} })

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        form={FORM_NAME}
        formName={FORM_NAME}
        formValueSelector={formValueSelector}
        handleFormSubmit={formOutput => {
          const item = nestedToCoreSync({
            item: formOutput,
            type: 'specimen',
          })
          return createSpecimen({ item }).then(res => {
            fetchResourceCount()
            onInteraction(CREATE_SUCCESS, { itemId: res.id })
            return res
          })
        }}
        initialValues={initialValues}
        mode="register"
        redirectOnSuccess
        {...rest}
      />
    )
  }
}

CreateSpecimen.propTypes = propTypes

export default compose(
  createGetResourceCount({ resource: 'specimen' }),
  createEnsureAllItemsFetched({ resource: 'identifierType' }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateSpecimen)
