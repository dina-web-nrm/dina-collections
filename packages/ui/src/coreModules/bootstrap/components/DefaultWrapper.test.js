import React from 'react'
import ReactDOM from 'react-dom'
import uiDescribe from 'utilities/test/uiDescribe'
import DefaultWrapper from './DefaultWrapper'

uiDescribe('coreModules/bootstrap/DefaultWrapper', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <DefaultWrapper>
        <div />
      </DefaultWrapper>,
      div
    )
  })
})
