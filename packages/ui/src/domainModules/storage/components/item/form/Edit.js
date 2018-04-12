import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateStorageLocation as updateStorageLocationAc } from 'dataModules/storageService/actionCreators'
import {
  createGetStorageLocationById,
  ensureAllStorageLocationsFetched,
} from 'dataModules/storageService/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'
import BaseForm from './Base'

const mapDispatchToProps = {
  updateStorageLocation: updateStorageLocationAc,
}

const propTypes = {
  allStorageLocationsFetched: PropTypes.bool,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  storageLocation: PropTypes.object,
  updateStorageLocation: PropTypes.func.isRequired,
}

const defaultProps = {
  allStorageLocationsFetched: undefined,
  storageLocation: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      allStorageLocationsFetched,
      storageLocation,
      onInteraction,
      itemId,
    } = this.props

    const initialValues = storageLocation && {
      group: storageLocation.group,
      name: storageLocation.name,
      parentId: storageLocation.parent && storageLocation.parent.id,
    }

    if (!initialValues || !allStorageLocationsFetched) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onInteraction={onInteraction}
        onSubmit={data => {
          this.props
            .updateStorageLocation({
              storageLocation: {
                id: itemId,
                ...data,
              },
            })
            .then(result => {
              onInteraction(FORM_EDIT_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  ensureAllStorageLocationsFetched(),
  createGetStorageLocationById(),
  connect(null, mapDispatchToProps)
)(Edit)
