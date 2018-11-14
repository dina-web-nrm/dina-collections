import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
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

export const include = ['resourceActivities']

const propTypes = {
  form: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  constructor(props) {
    super(props)
    this.formValueSelector = formValueSelectorFactory(props.form)
  }

  render() {
    const {
      form,
      nestedItem: initialValues,
      onInteraction,
      itemId,
      ...rest
    } = this.props

    if (!initialValues) {
      return null
    }

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form={form}
        formSectionNavigationHeader={initialValues.fullName}
        formSectionNavigationSubHeader={capitalizeFirstLetter(
          initialValues.agentType
        )}
        formValueSelector={this.formValueSelector}
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetNestedItemById({
    include,
    refresh: true,
    relationships: include,
    resolveRelationships: ['resourceActivity'],
    resource: 'normalizedAgent',
  }),
  connect(mapStateToProps)
)(Edit)
