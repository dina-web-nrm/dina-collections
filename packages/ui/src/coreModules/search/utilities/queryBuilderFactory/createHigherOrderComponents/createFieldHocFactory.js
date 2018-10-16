import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { buildLocalAggregationQuery } from '../utilities'

export default function createFieldHocFactory({
  querySpecificationsMap,
  selectors,
}) {
  const createFieldHoc = () => ComposedComponent => {
    const propTypes = {
      fieldName: PropTypes.string.isRequired,
      fieldValue: PropTypes.any,
      formValues: PropTypes.object,
      otherFieldFilters: PropTypes.object,
      sectionValues: PropTypes.object,
    }

    const defaultProps = {
      fieldValue: undefined,
      formValues: {},
      otherFieldFilters: undefined,
      sectionValues: {},
    }

    const mapStateToProps = (state, { input }) => {
      const fieldName = input.name
      if (!fieldName) {
        throw new Error('fieldName is required')
      }

      const { sectionName } = querySpecificationsMap[fieldName]

      return {
        fieldName,
        fieldValue: selectors.fieldValueSelectors[fieldName](state),
        formValues: selectors.getFormSelector(state),
        otherFieldFilters: selectors.otherFieldFiltersSelectors[fieldName](
          state
        ),
        sectionValues: sectionName
          ? selectors.sectionValueSelectors[sectionName](state)
          : undefined,
      }
    }

    class FieldHoc extends Component {
      constructor(props) {
        super(props)
        this.buildLocalAggregationQuery = this.buildLocalAggregationQuery.bind(
          this
        )
      }

      buildLocalAggregationQuery({ input } = {}) {
        const {
          fieldName,
          fieldValue,
          formValues,
          otherFieldFilters,
          sectionValues,
        } = this.props

        return buildLocalAggregationQuery({
          fieldName,
          fieldValue,
          formValues,
          input,
          otherFieldFilters,
          querySpecificationsMap,
          sectionValues,
        })
      }

      render() {
        const { otherFieldFilters } = this.props

        return (
          <ComposedComponent
            {...this.props}
            buildLocalAggregationQuery={this.buildLocalAggregationQuery}
            otherFieldFilters={otherFieldFilters}
          />
        )
      }
    }

    FieldHoc.propTypes = propTypes
    FieldHoc.defaultProps = defaultProps
    return compose(connect(mapStateToProps))(FieldHoc)
  }

  return createFieldHoc
}
