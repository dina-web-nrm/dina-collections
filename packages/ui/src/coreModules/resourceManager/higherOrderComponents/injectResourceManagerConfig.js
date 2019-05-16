import React from 'react'

import { useConfig } from 'coreModules/resourceManager/contexts/resourceManagerConfig'

const injectResourceManagerConfig = ComposedComponent => {
  const ResourceManagerConfigInjector = props => {
    const config = useConfig()

    return <ComposedComponent {...props} {...config} />
  }

  return ResourceManagerConfigInjector
}

export default injectResourceManagerConfig
