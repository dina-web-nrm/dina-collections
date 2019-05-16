import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { buildQuery } from '../utilities'

export default function createFormHocFactory({ formName, selectors }) {
  const createFormHoc = () => ComposedComponent => {
    const propTypes = {
      formValues: PropTypes.object,
    }

    const defaultProps = {
      formValues: {},
    }

    const mapStateToProps = state => {
      return {
        formValues: selectors.getFormSelector(state),
      }
    }

    class FormHoc extends Component {
      constructor(props) {
        super(props)
        this.buildQuery = this.buildQuery.bind(this)
      }

      buildQuery({ formValues = this.props.formValues } = {}) {
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
