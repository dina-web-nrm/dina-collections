/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import uiDescribe from 'utilities/test/uiDescribe'

import Input from './index'

uiDescribe('coreModules/form/components/Input', () => {
  let wrapper
  let emptyObj
  let baseMeta

  beforeEach(() => {
    emptyObj = {}
    baseMeta = { touched: false }
  })

  it('renders without crashing when given required props', () => {
    setupTestComponent({
      component: (
        <Input input={emptyObj} meta={baseMeta} module="module" name="name" />
      ),
    })
  })

  it('renders a text <input> by default', () => {
    wrapper = setupTestComponent({
      component: (
        <Input input={emptyObj} meta={baseMeta} module="module" name="name" />
      ),
    })

    expect(wrapper.find('input').props().type).toEqual('text')
  })

  it('renders a number <input>', () => {
    wrapper = setupTestComponent({
      component: (
        <Input
          input={emptyObj}
          meta={baseMeta}
          module="module"
          name="name"
          type="number"
        />
      ),
    })

    expect(wrapper.find('input').props().type).toEqual('number')
  })

  it('sets controlled value', () => {
    const controlledValue = 'controlledValue'
    wrapper = setupTestComponent({
      component: (
        <Input
          input={{ value: controlledValue }}
          meta={baseMeta}
          module="module"
          name="name"
        />
      ),
    })

    expect(wrapper.find('input').props().value).toEqual(controlledValue)
  })

  it('is called with new value on change', () => {
    const spy = jest.fn()
    const value = 'newValue'
    const e = { target: { value } }
    const props = {
      input: {
        onChange: spy,
      },
      meta: baseMeta,
      module: 'module',
      name: 'name',
    }

    wrapper = setupTestComponent({
      component: <Input {...props} />,
    })

    wrapper.find('input').simulate('change', e)

    expect(spy.mock.calls.length).toEqual(1)
    expect(spy.mock.calls[0]).toMatchObject([e, { value }])
  })
})
