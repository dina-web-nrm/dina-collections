import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { buildQuery } from '../utilities'

export default function createFormHocFactory({ formName, selectors }) {
  const createFormHoc = () => ComposedComponent => {
    const propTypes = {
      formValues: PropTypes.object,
      initialValues: PropTypes.object,
    }

    const defaultProps = {
      formValues: {},
      initialValues: {},
    }

    const mapStateToProps = state => {
      return {
        formValues: selectors.getFormSelector(state),
        initialValues: selectors.getFormInitialValuesSelector(state),
      }
    }

    class FormHoc extends Component {
      constructor(props) {
        super(props)
        this.buildQuery = this.buildQuery.bind(this)
      }

      buildQuery({ ignoreFilters = false, useInitialFilters = false } = {}) {
        const { formValues, initialValues } = this.props

        if (ignoreFilters) {
          return buildQuery({
            formName,
            formValues: {},
            getSubQueries: selectors.getSubQueries,
          })
        }

        if (useInitialFilters) {
          return buildQuery({
            formName,
            formValues: initialValues,
            getSubQueries: selectors.getSubQueries,
          })
        }

        return buildQuery({
          formName,
          formValues,
          getSubQueries: selectors.getSubQueries,
        })
      }

      render() {
        return (
          <ComposedComponent {...this.props} buildQuery={this.buildQuery} />
        )
      }
    }

    FormHoc.propTypes = propTypes
    FormHoc.defaultProps = defaultProps

    return compose(connect(mapStateToProps))(FormHoc)
  }

  return createFormHoc
}
