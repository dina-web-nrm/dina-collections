import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

const propTypes = {
  columnProps: PropTypes.shape({
    computer: PropTypes.number,
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    textAlign: PropTypes.string,
    verticalAlign: PropTypes.string,
    width: PropTypes.number,
  }),
}

const defaultProps = {
  columnProps: { width: 16 },
}

const wrapInColumn = ComposedComponent => {
  class ColumnWrapper extends PureComponent {
    render() {
      const { columnProps, ...rest } = this.props

      return (
        <Grid.Column {...columnProps}>
          <ComposedComponent {...rest} />
        </Grid.Column>
      )
    }
  }

  ColumnWrapper.propTypes = propTypes
  ColumnWrapper.defaultProps = defaultProps

  return ColumnWrapper
}

export default wrapInColumn
