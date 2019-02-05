import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import formParts from '../parts'

const mapStateToProps = (
  state,
  { baseValues, formName, formValueSelector, unitSpec }
) => {
  const { compareInitiallyHiddenWithBaseValues, name: unit } = unitSpec

  const initiallyHiddenFieldsHaveValue = formSupportSelectors.getInitiallyHiddenFieldsHaveValue(
    state,
    {
      baseValues,
      compareInitiallyHiddenWithBaseValues,
      formName,
      formValueSelector,
      unit,
    }
  )

  return {
    initiallyHiddenFieldsHaveValue,
  }
}

const propTypes = {
  baseValues: PropTypes.object,
  changeFieldValue: PropTypes.func,
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func,
  initiallyHiddenFieldsHaveValue: PropTypes.bool,
  moduleName: PropTypes.string.isRequired,
  removeArrayFieldByIndex: PropTypes.func,
  unitSpec: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }).isRequired
    ),
  }).isRequired,
}
const defaultProps = {
  baseValues: undefined,
  changeFieldValue: undefined,
  customParts: {},
  formValueSelector: undefined,
  initiallyHiddenFieldsHaveValue: undefined,
  removeArrayFieldByIndex: undefined,
}

class Unit extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { showInitiallyHiddenParts: false }

    this.showInitiallyHiddenParts = this.showInitiallyHiddenParts.bind(this)
  }

  componentDidMount() {
    if (this.props.initiallyHiddenFieldsHaveValue) {
      // need to use this flag, because otherwise a field could disappear if
      // we empty it's value while typing in it
      this.showInitiallyHiddenParts()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.initiallyHiddenFieldsHaveValue &&
      nextProps.initiallyHiddenFieldsHaveValue
    ) {
      this.showInitiallyHiddenParts()
    }
  }

  showInitiallyHiddenParts() {
    this.setState({ showInitiallyHiddenParts: true })
  }

  render() {
    const {
      changeFieldValue,
      customParts,
      formName,
      formValueSelector,
      moduleName,
      removeArrayFieldByIndex,
      unitSpec,
      ...rest
    } = this.props

    const { showInitiallyHiddenParts } = this.state

    const allParts = {
      ...formParts,
      ...customParts,
    }

    return (
      <Grid.Row className="relaxed">
        {unitSpec.parts.map(
          (
            {
              componentName,
              componentProps,
              containsReduxFormField,
              initiallyHidden,
              initiallyShown,
              name,
              wrapInField,
              ...partPropsRest
            },
            index
          ) => {
            const Component = allParts[componentName]

            if (!Component) {
              throw new Error(`Missing component for part ${componentName}`)
            }

            if (
              (initiallyHidden && !showInitiallyHiddenParts) ||
              (initiallyShown && showInitiallyHiddenParts)
            ) {
              return null
            }

            if (containsReduxFormField) {
              return (
                <Component
                  {...rest}
                  changeFieldValue={changeFieldValue}
                  formName={formName}
                  formValueSelector={formValueSelector}
                  key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                  module={moduleName}
                  name={name}
                  onClick={this.showInitiallyHiddenParts}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                  {...componentProps}
                  {...partPropsRest}
                />
              )
            }

            if (wrapInField) {
              return (
                <Field
                  {...rest}
                  autoComplete="off"
                  component={Component}
                  key={name}
                  module={moduleName}
                  name={name}
                  {...componentProps}
                  {...partPropsRest}
                />
              )
            }

            return (
              <Component
                {...rest}
                formValueSelector={formValueSelector}
                key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                module={moduleName}
                name={name}
                onClick={this.showInitiallyHiddenParts}
                {...componentProps}
                {...partPropsRest}
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

export default compose(connect(mapStateToProps))(Unit)
