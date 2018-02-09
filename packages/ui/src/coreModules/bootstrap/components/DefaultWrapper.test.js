import React from 'react'
import ReactDOM from 'react-dom'
import DefaultWrapper from './DefaultWrapper'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <DefaultWrapper>
      <div />
    </DefaultWrapper>,
    div
  )
})
