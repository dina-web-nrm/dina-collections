import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import BaseForm from './BaseForm'

const propTypes = {
  nestedItem: PropTypes.object,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { nestedItem, ...rest } = this.props

    if (!nestedItem) {
      return null
    }

    const { resourceActivities } = nestedItem

    return (
      <React.Fragment>
        <BaseForm
          {...rest}
          displayBackButton
          displayResetButton
          form="placeEdit"
          initialValues={nestedItem}
          onClose={event => {
            event.preventDefault()
          }}
          resourceActivities={resourceActivities}
        />
      </React.Fragment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default Edit
