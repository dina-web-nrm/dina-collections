import React from 'react'

import { useNavigation } from '../contexts/resourceManagerNavigation'

const injectResourceManagerNavigation = ComposedComponent => {
  const ResourceManagerNavigationInjector = props => {
    const navigationContext = useNavigation()

    return <ComposedComponent {...props} {...navigationContext} />
  }

  return ResourceManagerNavigationInjector
}

export default injectResourceManagerNavigation
