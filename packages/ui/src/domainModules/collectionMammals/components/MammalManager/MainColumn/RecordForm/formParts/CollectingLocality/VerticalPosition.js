import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Field, FieldTemplate, Input } from 'coreModules/form/components'

const inputStyle = {
  float: 'left',
  paddingRight: '0.1em',
  width: '6em',
}

const propTypes = {
  label: PropTypes.object,
  max: PropTypes.string.isRequired,
  min: PropTypes.string.isRequired,
  name: PropTypes.string,
}

export const defaultProps = {
  label: undefined,
  name: undefined,
}

class VerticalPosition extends Component {
  render() {
    const { label, name, max, min } = this.props

    return (
      <React.Fragment>
        <FieldTemplate
          enableHelpNotifications={false}
          float="left"
          label={label}
          meta={{}}
          name={name}
        >
          <div style={inputStyle}>
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              displayLabel={false}
              displaySubLabels={false}
              fluid
              labelPosition="right"
              module="collectionMammals"
              name={min}
              type="number"
            />
          </div>
          <div
            style={{
              float: 'left',
              marginTop: '0.5em',
              textAlign: 'center',
              width: '2em',
            }}
          >
            {'/'}
          </div>
          <div style={inputStyle}>
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              displayLabel={false}
              displaySubLabels={false}
              fluid
              labelPosition="right"
              module="collectionMammals"
              name={max}
              type="number"
            />
          </div>
        </FieldTemplate>
      </React.Fragment>
    )
  }
}

VerticalPosition.propTypes = propTypes
VerticalPosition.defaultProps = defaultProps

export default VerticalPosition
