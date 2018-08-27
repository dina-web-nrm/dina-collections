import React, { PureComponent } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { Input } from 'coreModules/form/components'

const propTypes = {
  displayLabel: PropTypes.bool,
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
  displayLabel: false,
  enableHelpNotifications: false,
  input: undefined,
  label: undefined,
  parameterKey: undefined,
  type: 'text',
}

class Remarks extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
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

  handleOnBlur(event) {
    event.preventDefault()
    this.setState({
      isEdit: false,
    })
  }

  render() {
    const {
      displayLabel,
      enableHelpNotifications,
      input,
      label,
      module,
      parameterKey,
      type,
    } = this.props

    const { isEdit } = this.state
    const { value } = input

    return (
      <Grid style={{ height: 50, paddingLeft: 11 }}>
        <Grid.Row onClick={isEdit ? undefined : this.handleAddOrEditRemark}>
          <div style={{ paddingTop: 6 }}>
            <Icon
              name={value ? 'commenting outline' : 'comment outline'}
              size="large"
            />
          </div>
          {isEdit && (
            <Input
              displayLabel={displayLabel}
              enableHelpNotifications={enableHelpNotifications}
              input={input}
              label={label}
              module={module}
              parameterKey={parameterKey}
              type={type}
            />
          )}
          {!isEdit && (
            <div style={{ paddingTop: 8 }}>{value || 'Add remarks...'}</div>
          )}
        </Grid.Row>
      </Grid>
    )
  }
}

Remarks.propTypes = propTypes
Remarks.defaultProps = defaultProps
export default Remarks
