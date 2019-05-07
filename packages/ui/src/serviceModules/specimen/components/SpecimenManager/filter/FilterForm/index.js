import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  formValueSelector as formValueSelectorFactory,
  getFormInitialValues as getFormInitialValuesFactory,
  getFormValues,
  reduxForm,
} from 'redux-form'

import { Accordion } from 'coreModules/commonUi/components'
import { MULTI } from 'coreModules/commonUi/constants'
import { SPECIMEN_FILTERS_FORM_NAME } from '../../../../constants'
import buildQuery from '../../../../utilities/buildQuery'
import FilterContent from './FilterContent'
import FilterTitle from './FilterTitle'

const formValueSelector = formValueSelectorFactory(SPECIMEN_FILTERS_FORM_NAME)
const getFormInitialValues = getFormInitialValuesFactory(
  SPECIMEN_FILTERS_FORM_NAME
)

const items = [
  { name: 'identifier' },
  { doDeepEqualInitialValuesComparison: true, name: 'taxonomy' },
  { name: 'locality' },
  { name: 'datePeriod' },
  { name: 'agent' },
  { name: 'physicalObject' },
  { doDeepEqualInitialValuesComparison: true, name: 'storage' },
  { name: 'ageAndStage' },
  { name: 'sex' },
  { name: 'collectingCondition' },
  { doDeepEqualInitialValuesComparison: true, name: 'weight' },
  { doDeepEqualInitialValuesComparison: true, name: 'length' },
  { name: 'bones' },
  { doDeepEqualInitialValuesComparison: true, name: 'remarks' },
]

const mapStateToProps = (state, { form }) => {
  const formValues = getFormValues(form)(state)
  return {
    formValues,
  }
}
const propTypes = {
  formValues: PropTypes.object,
}
const defaultProps = {
  formValues: undefined,
}

export class RawFilters extends PureComponent {
  constructor(props) {
    super(props)
    this.getDrilldownQuery = this.getDrilldownQuery.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
  }

  getDrilldownQuery(excludeKey) {
    return buildQuery(this.props.formValues, excludeKey)
  }

  renderContent(props) {
    return (
      <FilterContent
        {...this.props}
        {...props}
        formValueSelector={formValueSelector}
        getDrilldownQuery={this.getDrilldownQuery}
        getFormInitialValues={getFormInitialValues}
      />
    )
  }

  renderTitle(props) {
    return (
      <FilterTitle
        {...this.props}
        {...props}
        formValueSelector={formValueSelector}
        getFormInitialValues={getFormInitialValues}
      />
    )
  }

  render() {
    return (
      <Accordion
        className="ui form"
        delayItemRenderUntilActive
        items={items}
        renderContent={this.renderContent}
        renderTitle={this.renderTitle}
        selectMode={MULTI}
      />
    )
  }
}

RawFilters.propTypes = propTypes
RawFilters.defaultProps = defaultProps

const EnhancedFilters = compose(connect(mapStateToProps))(RawFilters)

export default reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: SPECIMEN_FILTERS_FORM_NAME,
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
})(EnhancedFilters)
