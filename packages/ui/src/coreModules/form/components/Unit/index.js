import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { getHiddenFieldsHaveValue } from 'coreModules/form/utilities'
import formParts from '../parts'

const mapStateToProps = (state, { formValueSelector, unitSpec }) => {
  if (
    unitSpec &&
    unitSpec.initiallyHiddenFields &&
    unitSpec.initiallyHiddenFields.length
  ) {
    return {
      hiddenFieldsHaveValue: getHiddenFieldsHaveValue({
        fields: unitSpec.initiallyHiddenFields,
        formValueSelector,
        state,
      }),
    }
  }

  return {}
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  hiddenFieldsHaveValue: PropTypes.bool,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  unitSpec: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }).isRequired
    ),
    name: PropTypes.string.isRequired,
  }).isRequired,
}
const defaultProps = {
  customParts: {},
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
      customParts,
      formName,
      formValueSelector,
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
                  module="collectionMammals"
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
                  module="collectionMammals"
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
                module="collectionMammals"
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
