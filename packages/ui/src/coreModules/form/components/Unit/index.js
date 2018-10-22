import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import formParts from '../parts'

const mapStateToProps = (state, { formName, formValueSelector, unitSpec }) => {
  const unit = unitSpec.name

  const initiallyHiddenFieldsHaveValue = formSupportSelectors.getInitiallyHiddenFieldsHaveValue(
    state,
    {
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
              ...rest
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
                  changeFieldValue={changeFieldValue}
                  formName={formName}
                  formValueSelector={formValueSelector}
                  key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                  module={moduleName}
                  name={name}
                  onClick={this.showInitiallyHiddenParts}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                  {...componentProps}
                  {...rest}
                />
              )
            }

            if (wrapInField) {
              return (
                <Field
                  autoComplete="off"
                  component={Component}
                  key={name}
                  module={moduleName}
                  name={name}
                  {...componentProps}
                  {...rest}
                />
              )
            }

            return (
              <Component
                formValueSelector={formValueSelector}
                key={`${componentName}-${index}`} // eslint-disable-line react/no-array-index-key
                module={moduleName}
                name={name}
                onClick={this.showInitiallyHiddenParts}
                {...componentProps}
                {...rest}
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
