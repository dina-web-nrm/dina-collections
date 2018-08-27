import React, { PureComponent } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { injectIsLatestActiveField } from 'coreModules/form/higherOrderComponents'
import Input from '../Input'

const propTypes = {
  displayLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }),
  isLatestActiveField: PropTypes.bool.isRequired,
  label: PropTypes.string,
  module: PropTypes.string.isRequired,
  parameterKey: PropTypes.string,
  setAsLatestActiveField: PropTypes.func.isRequired,
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
  render() {
    const {
      displayLabel,
      enableHelpNotifications,
      input,
      isLatestActiveField,
      label,
      module,
      parameterKey,
      setAsLatestActiveField,
      type,
    } = this.props

    const { value } = input

    return (
      <Grid style={{ height: 50, paddingLeft: 11 }}>
        <Grid.Column
          onClick={isLatestActiveField ? undefined : setAsLatestActiveField}
          style={{ padding: 0 }}
        >
          <div style={{ float: 'left', paddingTop: 6 }}>
            <Icon
              name={value ? 'commenting outline' : 'comment outline'}
              size="large"
            />
          </div>
          {isLatestActiveField && (
            <Input
              displayLabel={displayLabel}
              enableHelpNotifications={enableHelpNotifications}
              fluid
              focusOnMount
              input={input}
              label={label}
              module={module}
              parameterKey={parameterKey}
              type={type}
            />
          )}
          {!isLatestActiveField && (
            <div style={{ paddingTop: 8 }}>{value || 'Add remarks...'}</div>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

Remarks.propTypes = propTypes
Remarks.defaultProps = defaultProps

export default injectIsLatestActiveField(Remarks)
