import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'
import crudActionCreators from 'coreModules/crud/actionCreators'
import {
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
} from 'coreModules/crudBlocks/constants'

import BaseForm, { FORM_NAME } from './Base'

const mapDispatchToProps = {
  createStorageLocation: crudActionCreators.storageLocation.create,
  destroy,
}

const propTypes = {
  createStorageLocation: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  itemId: undefined,
}

export class Create extends PureComponent {
  componentWillMount() {
    // necessary to ensure form is emptied if coming from an edit form with
    // other pre-filled values
    this.props.destroy([FORM_NAME])
  }

  render() {
    const { itemId, onInteraction, ...rest } = this.props
    const initialValues = itemId ? { parent: { id: itemId } } : {}

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onSubmit={data => {
          this.props
            .createStorageLocation({
              item: data,
              nested: true,
            })
            .then(result => {
              onInteraction(FORM_CREATE_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default compose(connect(null, mapDispatchToProps))(Create)
