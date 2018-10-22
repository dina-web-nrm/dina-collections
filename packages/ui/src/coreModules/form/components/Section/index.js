import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'

import Unit from '../Unit'

const propTypes = {
  changeFieldValue: PropTypes.func,
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func,
  moduleName: PropTypes.string.isRequired,
  removeArrayFieldByIndex: PropTypes.func,
  sectionSpec: PropTypes.shape({
    name: PropTypes.string.isRequired,
    units: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}
const defaultProps = {
  changeFieldValue: undefined,
  customParts: undefined,
  formValueSelector: undefined,
  removeArrayFieldByIndex: undefined,
}

class Section extends PureComponent {
  render() {
    const {
      changeFieldValue,
      customParts,
      formName,
      formValueSelector,
      moduleName,
      removeArrayFieldByIndex,
      sectionSpec,
    } = this.props

    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="bottom">
          {sectionSpec.units.map(unit => {
            return (
              <Unit
                changeFieldValue={changeFieldValue}
                customParts={customParts}
                formName={formName}
                formValueSelector={formValueSelector}
                key={unit.name}
                moduleName={moduleName}
                name={unit.name}
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                unitSpec={unit}
              />
            )
          })}
        </Grid>
      </Segment>
    )
  }
}

Section.propTypes = propTypes
Section.defaultProps = defaultProps

export default compose()(Section)
