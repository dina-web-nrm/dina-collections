import React, { Component } from 'react'

import { NAVIGATION_ITEMS } from '../constants'

const injectNavigationItems = ComposedComponent => {
  class WithNavigationItems extends Component {
    render() {
      return (
        <ComposedComponent {...this.props} navigationItems={NAVIGATION_ITEMS} />
      )
    }
  }

  return WithNavigationItems
}

export default injectNavigationItems
