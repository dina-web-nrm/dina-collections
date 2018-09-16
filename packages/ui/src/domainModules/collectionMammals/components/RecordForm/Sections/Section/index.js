import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'

import { injectFormPartStatus } from 'coreModules/form/higherOrderComponents'
import Unit, { unitSpecs } from '../../Units'

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  childSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
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
    } = this.props

    return (
      <Segment color="green">
        <Grid textAlign="left" verticalAlign="bottom">
          {childSpecs.map(({ name: unitName }) => {
            return (
              <Unit
                changeFieldValue={changeFieldValue}
                childSpecs={unitSpecs[unitName]}
                formName={formName}
                formValueSelector={formValueSelector}
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
