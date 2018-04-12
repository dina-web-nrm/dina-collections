import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import { createStorageLocation as createStorageLocationAc } from 'dataModules/storageService/actionCreators'
import { ensureAllStorageLocationsFetched } from 'dataModules/storageService/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
} from 'coreModules/crudBlocks/constants'

import BaseForm, { FORM_NAME } from './Base'

const mapDispatchToProps = {
  createStorageLocation: createStorageLocationAc,
  destroy,
}

const propTypes = {
  allStorageLocationsFetched: PropTypes.bool,
  createStorageLocation: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,

  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  allStorageLocationsFetched: undefined,
  itemId: undefined,
}

export class Create extends PureComponent {
  componentWillMount() {
    // necessary to ensure form is emptied if coming from an edit form with
    // other pre-filled values
    this.props.destroy([FORM_NAME])
  }

  render() {
    const {
      allStorageLocationsFetched,
      itemId,
      onInteraction,
      ...rest
    } = this.props

    if (!allStorageLocationsFetched) {
      return null
    }

    const initialValues = itemId && { parentId: itemId }

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
              storageLocation: data,
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

export default compose(
  ensureAllStorageLocationsFetched(),
  connect(null, mapDispatchToProps)
)(Create)
