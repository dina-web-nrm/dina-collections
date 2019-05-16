import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { injectResourceManagerNavigation } from '../../../shared/higherOrderComponents'
import RecordNavigationBar from '../../../shared/components/RecordNavigationBar'

const propTypes = {
  navigateCreate: PropTypes.func.isRequired,
}

const TreeNavigationBar = ({ navigateCreate }) => {
  return (
    <RecordNavigationBar
      disableRecordNavigation
      navigateCreate={navigateCreate}
    />
  )
}

TreeNavigationBar.propTypes = propTypes

export default compose(injectResourceManagerNavigation)(TreeNavigationBar)
