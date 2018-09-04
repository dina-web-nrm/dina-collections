import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { formValueSelector as formValueSelectorFactory } from 'redux-form'

import { ColumnRowHeader } from 'coreModules/commonUi/components'
import { RowLayout } from 'coreModules/layout/components'
import { injectWindowHeight } from 'coreModules/size/higherOrderComponents'
import { SPECIMEN_FILTERS_FORM_NAME } from '../../../constants'
import BottomBar from './BottomBar'
import Filters from './Filters'

const formValueSelector = formValueSelectorFactory(SPECIMEN_FILTERS_FORM_NAME)

const main = {
  key: 'main',
  renderRow: props => <Filters {...props} />,
  style: { overflow: 'auto' },
}

const header = {
  height: '50px',
  key: 'header',
  renderRow: () => <ColumnRowHeader text="Find records" />,
}

const bottomBar = {
  height: '60px',
  key: 'bottomBar',
  renderRow: props => <BottomBar {...props} />,
}

const rows = [header, main, bottomBar]

const propTypes = {
  windowHeight: PropTypes.number.isRequired,
}

class FilterColumn extends PureComponent {
  render() {
    const { windowHeight } = this.props

    return (
      <RowLayout
        availableHeight={windowHeight - 40}
        form={SPECIMEN_FILTERS_FORM_NAME}
        formValueSelector={formValueSelector}
        rows={rows}
        {...this.props}
      />
    )
  }
}

FilterColumn.propTypes = propTypes

export default compose(injectWindowHeight)(FilterColumn)
