import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
    const { nestedItem, onInteraction, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { resourceActivities } = nestedItem

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        form="storageLocationEdit"
        initialValues={nestedItem}
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
