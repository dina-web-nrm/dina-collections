import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { injectFormPartStatus } from 'coreModules/form/higherOrderComponents'
import { getHiddenFieldsHaveValue } from 'coreModules/form/utilities'
import * as Parts from '../parts'

const mapStateToProps = (state, { formValueSelector, childSpecs }) => {
  if (
    childSpecs &&
    childSpecs.initiallyHiddenKeys &&
    childSpecs.initiallyHiddenKeys.length
  ) {
    return {
      hiddenFieldsHaveValue: getHiddenFieldsHaveValue({
        formValueSelector,
        keys: childSpecs.initiallyHiddenKeys,
        state,
      }),
    }
  }

  return {}
}

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
  hiddenFieldsHaveValue: PropTypes.bool,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
}
const defaultProps = {
  hiddenFieldsHaveValue: undefined,
}

class Unit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { showInitiallyHiddenParts: false }

    this.showInitiallyHiddenParts = this.showInitiallyHiddenParts.bind(this)
  }

  componentDidMount() {
    if (this.props.hiddenFieldsHaveValue) {
      this.showInitiallyHiddenParts()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.hiddenFieldsHaveValue && nextProps.hiddenFieldsHaveValue) {
      this.showInitiallyHiddenParts()
    }
  }

  showInitiallyHiddenParts() {
    this.setState({ showInitiallyHiddenParts: true })
  }

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

    const { showInitiallyHiddenParts } = this.state

    return (
      <Grid.Row className="relaxed">
        {childSpecs.items.map(
          (
            {
              componentName,
              containsReduxFormField,
              initiallyHidden,
              initiallyShown,
              name,
              ...rest
            },
            index
          ) => {
            const Component = Parts[componentName]

            if (!Component) {
              throw new Error(`Missing component for part ${componentName}`)
            }

            if (
              (initiallyHidden && !showInitiallyHiddenParts) ||
              (initiallyShown && showInitiallyHiddenParts)
            ) {
              return null
            }

            if (containsReduxFormField || !name) {
              return (
                <Component
                  key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                  module="collectionMammals"
                  {...rest}
                  changeFieldValue={changeFieldValue}
                  formName={formName}
                  formValueSelector={formValueSelector}
                  name={name}
                  onClick={this.showInitiallyHiddenParts}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                />
              )
            }

            return (
              <Field
                autoComplete="off"
                key={name}
                module="collectionMammals"
                {...rest}
                component={Component}
                name={name}
                setChildDirty={setChildDirty}
                setChildInvalid={setChildInvalid}
              />
            )
          }
        )}
      </Grid.Row>
    )
  }
}

Unit.propTypes = propTypes
Unit.defaultProps = defaultProps

export default compose(injectFormPartStatus(), connect(mapStateToProps))(Unit)
