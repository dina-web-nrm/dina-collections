import React from 'react'
import ReactDOM from 'react-dom'
import uiDescribe from 'utilities/test/uiDescribe'
import DefaultLoader from './DefaultLoader'

uiDescribe('coreModles/bootstrap/DefaultLoader', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DefaultLoader loading />, div)
  })
})
