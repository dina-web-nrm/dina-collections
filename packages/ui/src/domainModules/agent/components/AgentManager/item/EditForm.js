import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { getChildrenIds, getParentId } from 'coreModules/crud/utilities'

import BaseForm from './BaseForm'

const mapStateToProps = (state, ownProps) => {
  const { item: normalizedAgent } = ownProps
  const parentId = getParentId(normalizedAgent)
  const parent =
    parentId && globalCrudSelectors.normalizedAgent.getOne(state, parentId)
  const children = getChildrenIds(normalizedAgent).map(id => {
    return (
      globalCrudSelectors.normalizedAgent.getOne(state, id) || {
        id,
      }
    )
  })

  return {
    children,
    parent,
  }
}

const mapDispatchToProps = {
  updatePlace: crudActionCreators.normalizedAgent.update,
}

const propTypes = {
  form: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  updatePlace: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      form,
      nestedItem: initialValues,
      onInteraction,
      itemId,
    } = this.props

    if (!initialValues) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        form={form}
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
        onSubmit={formOutput => {
          this.props
            .updatePlace({
              item: {
                id: itemId,
                ...formOutput,
              },
              nested: true,
            })
            .then(result => {
              onInteraction('FORM_EDIT_SUCCESS', {
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
    relationships: ['all'],
    resource: 'normalizedAgent',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Edit)
