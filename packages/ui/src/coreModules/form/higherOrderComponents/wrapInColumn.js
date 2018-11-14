import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import extractProps from 'utilities/extractProps'

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

      if (columnProps.clear) {
        const { rest: cleanedColumnProps } = extractProps({
          keys: ['clear'],
          props: columnProps,
        })

        return (
          <Grid.Column width={16}>
            <Grid textAlign="left" verticalAlign="bottom">
              <Grid.Row>
                <Grid.Column {...cleanedColumnProps}>
                  <ComposedComponent {...rest} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        )
      }

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
