import React, { PureComponent } from 'react'
import {
  reduxForm,
  formValueSelector as formValueSelectorFactory,
} from 'redux-form'

import { Accordion } from 'coreModules/commonUi/components'
import { MULTI } from 'coreModules/commonUi/constants'
import FilterContent from './FilterContent'
import FilterTitle from './FilterTitle'

const FORM_NAME = 'specimenFilters'
const formValueSelector = formValueSelectorFactory(FORM_NAME)

const propTypes = {}

const items = [
  { name: 'identifier', titleTextKey: 'identifier' },
  { name: 'taxonomy', titleTextKey: 'taxonomy' },
]

export class RawFilters extends PureComponent {
  constructor(props) {
    super(props)
    this.renderContent = this.renderContent.bind(this)
    this.renderTitle = this.renderTitle.bind(this)
  }

  renderContent(props) {
    return <FilterContent {...this.props} {...props} />
  }

  renderTitle(props) {
    return (
      <FilterTitle
        {...this.props}
        {...props}
        formValueSelector={formValueSelector}
      />
    )
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

export default reduxForm({
  enableReinitialize: true,
  form: FORM_NAME,
  keepDirtyOnReinitialize: true,
  updateUnregisteredFields: true,
})(RawFilters)
