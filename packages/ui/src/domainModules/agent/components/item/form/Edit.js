import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import {
  FORM_CANCEL,
  FORM_EDIT_SUCCESS,
} from 'coreModules/crudBlocks/constants'
import BaseForm from './Base'

const mapDispatchToProps = {
  updateAgent: crudActionCreators.agent.update,
}

const propTypes = {
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  updateAgent: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem: initialValues, onInteraction, itemId } = this.props
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
        onSubmit={formOutput => {
          this.props
            .updateAgent({
              item: {
                id: itemId,
                ...formOutput,
              },
              nested: true,
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
  createGetNestedItemById({
    relationships: [],
    resource: 'agent',
  }),
  connect(null, mapDispatchToProps)
)(Edit)
