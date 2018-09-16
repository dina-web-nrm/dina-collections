import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { Field } from 'coreModules/form/components'
import { injectFormPartStatus } from 'coreModules/form/higherOrderComponents'
import * as Parts from '../../Parts'

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  childSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
}

class Unit extends PureComponent {
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
      <React.Fragment>
        {childSpecs.map(({ componentName, name, ...rest }) => {
          const Component = Parts[componentName]

          if (!Component) {
            throw new Error(`Missing component for part ${componentName}`)
          }

          if (name) {
            return (
              <Field
                autoComplete="off"
                module="collectionMammals"
                {...rest}
                component={Component}
                name={name}
                setChildDirty={setChildDirty}
                setChildInvalid={setChildInvalid}
              />
            )
          }

          return (
            <Component
              module="collectionMammals"
              {...rest}
              changeFieldValue={changeFieldValue}
              formName={formName}
              formValueSelector={formValueSelector}
              removeArrayFieldByIndex={removeArrayFieldByIndex}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

Unit.propTypes = propTypes

export default compose(injectFormPartStatus())(Unit)
