import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'
import crudActionCreators from 'coreModules/crud/actionCreators'

import BaseForm from './BaseForm'

const mapDispatchToProps = {
  createPlace: crudActionCreators.place.create,
  destroy,
}

const propTypes = {
  createPlace: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  itemId: undefined,
}

export class Create extends PureComponent {
  render() {
    const { itemId, onInteraction, ...rest } = this.props
    const initialValues = itemId ? { parent: { id: itemId } } : {}

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="storageLocationCreate"
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onSubmit={data => {
          this.props
            .createPlace({
              item: data,
              nested: true,
            })
            .then(result => {
              onInteraction('FORM_CREATE_SUCCESS', {
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
