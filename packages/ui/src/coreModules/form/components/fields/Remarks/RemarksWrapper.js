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
          {children}
        </Grid.Column>
      </Grid>
    )
  }
}

RemarksWrapper.propTypes = propTypes

export default RemarksWrapper
