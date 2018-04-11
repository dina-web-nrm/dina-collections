import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updatePlace as updatePlaceAc } from 'dataModules/localityService/actionCreators'
import { createGetPlaceById } from 'dataModules/localityService/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'domainModules/locality/interactions'
import BaseForm from './Base'

const mapDispatchToProps = {
  updatePlace: updatePlaceAc,
}

const propTypes = {
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  place: PropTypes.object,
  updatePlace: PropTypes.func.isRequired,
}

const defaultProps = {
  place: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { place, onInteraction, itemId } = this.props
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
              place: {
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

export default compose(createGetPlaceById(), connect(null, mapDispatchToProps))(
  Edit
)
