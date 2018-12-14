import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'

import BaseForm from './BaseForm'

const propTypes = {
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { onInteraction, nestedItem, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { resourceActivities } = nestedItem

    const initialValues = { ...nestedItem }

    if (objectPath.get(initialValues, 'parent.acceptedTaxonName')) {
      delete initialValues.parent.acceptedTaxonName
    }

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="taxonEdit"
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onInteraction={onInteraction}
        resourceActivities={resourceActivities}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default Edit
