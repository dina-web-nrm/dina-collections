import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Divider, Grid, Header } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import createLog from 'utilities/log'
import { createInjectScrollLeft } from 'coreModules/size/higherOrderComponents'
import tableColumnSpecifications from '../tableColumnSpecifications'

const log = createLog(
  'modules:collectionMammals:MammalManager:ResultTableView:InfiniteTableHeader'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  height: PropTypes.number.isRequired,
  scrollLeft: PropTypes.number,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  topOffset: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
}
const defaultProps = {
  scrollLeft: 0,
}

class InfiniteTableHeader extends PureComponent {
  render() {
    log.render()
    const {
      height,
      topOffset,
      scrollLeft,
      tableColumnsToShow,
      width,
    } = this.props

    return (
      <React.Fragment>
        <Grid
          padded
          style={{
            height,
            left: -scrollLeft,
            position: 'absolute',
            top: topOffset,
            width,
          }}
          textAlign="left"
          verticalAlign="middle"
        >
          <Grid.Column style={{ width: 80 }} textAlign="right">
            <Header size="small">Row #</Header>
          </Grid.Column>
          {tableColumnSpecifications.map(({ name, width: columnWidth }) => {
            if (tableColumnsToShow.includes(name)) {
              return (
                <Grid.Column key={name} style={{ width: columnWidth }}>
                  <Header size="small">
                    <ModuleTranslate
                      capitalize
                      textKey={`tableColumns.${name}`}
                    />
                  </Header>
                </Grid.Column>
              )
            }

            return null
          })}
        </Grid>
        <Divider fitted />
      </React.Fragment>
    )
  }
}

InfiniteTableHeader.propTypes = propTypes
InfiniteTableHeader.defaultProps = defaultProps

export default createInjectScrollLeft('resultTableScrollContainer')(
  InfiniteTableHeader
)
