import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { Translate } from 'coreModules/i18n/components'
import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'

const propTypes = {
  height: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number,
  tableColumnSpecifications: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  scrollLeft: 0,
}

class InfiniteTableHeader extends PureComponent {
  render() {
    const { height, scrollLeft, width, tableColumnSpecifications } = this.props

    return (
      <React.Fragment>
        <Grid
          padded
          style={{
            height,
            left: -scrollLeft,
            position: 'absolute',
            width,
          }}
          textAlign="left"
          verticalAlign="middle"
        >
          <Grid.Row>
            {tableColumnSpecifications.map(({ label, width: columnWidth }) => {
              return (
                <Grid.Column key={label} style={{ width: columnWidth }}>
                  <Header size="small">
                    <Translate capitalize textKey={label} />
                  </Header>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

InfiniteTableHeader.propTypes = propTypes
InfiniteTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('tableScrollContainer')(
  InfiniteTableHeader
)
