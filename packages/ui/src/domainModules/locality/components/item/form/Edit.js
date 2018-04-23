import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'

import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'
import BaseForm from './Base'

const mapDispatchToProps = {
  updatePlace: crudActionCreators.place.update,
}

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  updatePlace: PropTypes.func.isRequired,
}

const defaultProps = {
  item: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { item: place, onInteraction, itemId } = this.props
    const initialValues = place && {
      group: place.group,
      name: place.name,
      parent: place.parent
        ? {
            id: place.parent.id,
          }
        : {},
    }

    if (!initialValues) {
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
            .updatePlace({
              item: {
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
  createGetItemById({ resource: 'place' }),
  connect(null, mapDispatchToProps)
)(Edit)
