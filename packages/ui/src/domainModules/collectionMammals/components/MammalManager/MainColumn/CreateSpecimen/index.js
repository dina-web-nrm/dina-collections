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
  establishmentMeansTypes: PropTypes.array.isRequired,
  establishmentMeansTypesFetched: PropTypes.bool.isRequired,
  fetchResourceCount: PropTypes.func.isRequired,
  identifierTypes: PropTypes.array.isRequired,
  identifierTypesFetched: PropTypes.bool.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

class CreateSpecimen extends PureComponent {
  render() {
    log.render()

    const {
      createSpecimen,
      establishmentMeansTypes,
      establishmentMeansTypesFetched,
      fetchResourceCount,
      identifierTypes,
      identifierTypesFetched,
      onInteraction,
      ...rest
    } = this.props

    if (!establishmentMeansTypesFetched || !identifierTypesFetched) {
      return null
    }

    const initialValues = setDefaultValues({
      establishmentMeansTypes,
      identifierTypes,
      specimen: {},
    })

    log.debug('initialValues', initialValues)
    return (
      <RecordForm
        establishmentMeansTypes={establishmentMeansTypes}
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
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'establishmentMeansTypesFetched',
    resource: 'establishmentMeansType',
  }),
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'identifierTypesFetched',
    resource: 'identifierType',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateSpecimen)
