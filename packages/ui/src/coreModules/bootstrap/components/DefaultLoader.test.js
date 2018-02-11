import React from 'react'
import ReactDOM from 'react-dom'
import DefaultLoader from './DefaultLoader'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<DefaultLoader loading />, div)
})
