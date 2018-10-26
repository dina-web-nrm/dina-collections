import React, { PureComponent } from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  setAsLatestActiveField: PropTypes.func.isRequired,
}

class RemarksWrapper extends PureComponent {
  render() {
    const {
      children,
      input: { value },
      isLatestActiveField,
      setAsLatestActiveField,
    } = this.props

    return (
      <Grid padded>
        <Grid.Column
          onClick={isLatestActiveField ? undefined : setAsLatestActiveField}
          style={{
            padding: 0,
            paddingLeft: '2em',
            position: 'relative',
          }}
        >
          <div
            style={{
              float: 'left',
              left: 0,
              position: 'absolute',
              top: '0.25em',
            }}
          >
            <Icon
              name={value ? 'commenting outline' : 'comment outline'}
              size="large"
            />
          </div>
          {children}
        </Grid.Column>
      </Grid>
    )
  }
}

RemarksWrapper.propTypes = propTypes

export default RemarksWrapper
