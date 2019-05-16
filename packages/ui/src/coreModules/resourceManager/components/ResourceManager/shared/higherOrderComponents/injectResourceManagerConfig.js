import React from 'react'

import { useConfig } from '../contexts/resourceManagerConfig'

const injectResourceManagerConfig = ComposedComponent => {
  const ResourceManagerConfigInjector = props => {
    const configContext = useConfig()

    return <ComposedComponent {...props} {...configContext} />
  }

  return ResourceManagerConfigInjector
}

export default injectResourceManagerConfig
