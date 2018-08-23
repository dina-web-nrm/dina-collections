import React, { Component } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Input } from 'coreModules/form/components'

const propTypes = {
  enableHelpNotifications: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  label: PropTypes.string,
  module: PropTypes.string.isRequired,
  parameterKey: PropTypes.string,
  type: PropTypes.string,
}

const defaultProps = {
  enableHelpNotifications: true,
  input: undefined,
  label: undefined,
  parameterKey: undefined,
  type: 'text',
}

class Remarks extends Component {
  constructor(props) {
    super(props)

    const { input } = props

    this.state = {
      icon: input.value ? 'commenting outline' : 'comment outline',
      isEdit: false,
      labelText: input.value || 'Add remarks...',
    }

    this.handleAddOrEditRemark = this.handleAddOrEditRemark.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  handleAddOrEditRemark(event) {
    event.preventDefault()
    this.setState({
      isEdit: true,
    })
  }

  handleOnBlur(event, value) {
    event.preventDefault()
    this.setState({
      icon: value ? 'commenting outline' : 'comment outline',
      isEdit: false,
      labelText: value || 'Add remarks...',
    })
  }

  render() {
    const {
      enableHelpNotifications,
      input,
      label,
      module,
      parameterKey,
      type,
    } = this.props

    const { icon, isEdit, labelText } = this.state

    return (
      <Grid style={{ height: 50, paddingLeft: 11 }}>
        <Grid.Row onClick={isEdit ? undefined : this.handleAddOrEditRemark}>
          <div style={{ paddingTop: 6 }}>
            <Icon name={icon} size="large" />
          </div>
          {isEdit && (
            <Input
              enableHelpNotifications={enableHelpNotifications}
              input={input}
              label={label}
              module={module}
              parameterKey={parameterKey}
              type={type}
            />
          )}
          <div style={{ paddingTop: 8 }}>{!isEdit && labelText}</div>
        </Grid.Row>
      </Grid>
    )
  }
}

Remarks.propTypes = propTypes
Remarks.defaultProps = defaultProps
export default Remarks
