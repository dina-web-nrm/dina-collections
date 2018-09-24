import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'

import { injectFormPartStatus } from 'coreModules/form/higherOrderComponents'
import Unit from '../Unit'

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  childSpecs: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }).isRequired
    ),
  }).isRequired,
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
  unitSpecs: PropTypes.objectOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          componentName: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
}

class Section extends PureComponent {
  render() {
    const {
      changeFieldValue,
      childSpecs,
      formName,
      formValueSelector,
      removeArrayFieldByIndex,
      setChildDirty,
      setChildInvalid,
      unitSpecs,
    } = this.props

    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="bottom">
          {childSpecs.items.map(({ name: unitName }) => {
            return (
              <Unit
                changeFieldValue={changeFieldValue}
                childSpecs={unitSpecs[unitName]}
                formName={formName}
                formValueSelector={formValueSelector}
                key={unitName}
                name={unitName}
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                setChildDirty={setChildDirty}
                setChildInvalid={setChildInvalid}
              />
            )
          })}
        </Grid>
      </Segment>
    )
  }
}

Section.propTypes = propTypes

export default compose(injectFormPartStatus())(Section)
