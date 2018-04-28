import React from 'react'
import { Loader } from 'semantic-ui-react'

const BlockLoader = () => {
  return (
    <div style={{ height: '400px' }}>
      <Loader active content="Loading" />
    </div>
  )
}

export default BlockLoader
