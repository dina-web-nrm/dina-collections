import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import FieldTemplate from '../../../FieldTemplate'

const propTypes = {
  displaySubLabel: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

const defaultProps = {
  displaySubLabel: false,
}

class TodayButton extends Component {
  render() {
    const { displaySubLabel } = this.props
    return (
      <FieldTemplate
        displayLabel={!!displaySubLabel}
        enableHelpNotifications={false}
        float="left"
        label=""
        meta={{}}
      >
        <Button onClick={this.props.onClick} type="button">
          Today
        </Button>
      </FieldTemplate>
    )
  }
}

TodayButton.propTypes = propTypes
TodayButton.defaultProps = defaultProps

export default TodayButton
