import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form'

import { Accordion } from 'coreModules/commonUi/components'
import { MULTI } from 'coreModules/commonUi/constants'
import buildQuery from '../../../../utilities/buildQuery'
import FilterContent from './FilterContent'
import FilterTitle from './FilterTitle'

const items = [
  { name: 'identifier' },
  { name: 'taxonomy' },
  { name: 'locality' },
  { name: 'datePeriod' },
  { name: 'agent' },
  { name: 'physicalObject' },
  { name: 'storage' },
  { name: 'ageAndStage' },
  { name: 'sex' },
  { name: 'bones' },
  { name: 'weight' },
  { name: 'length' },
  { name: 'collectingCondition' },
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
        getDrilldownQuery={this.getDrilldownQuery}
      />
    )
  }

  renderTitle(props) {
    return <FilterTitle {...this.props} {...props} />
  }

  render() {
    return (
      <Accordion
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
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
})(EnhancedFilters)
