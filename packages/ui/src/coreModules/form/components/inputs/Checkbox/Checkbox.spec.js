/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import uiDescribe from 'utilities/test/uiDescribe'
import Checkbox from './index'

const createInputObjectMock = (overrides = {}) => {
  return {
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    ...overrides,
  }
}

const getValue = props => {
  return !!props.checked
}

uiDescribe('coreModules/form/components/inputs/Checkbox', () => {
  let inputObject
  let wrapper
  let initialValue
  let updateValue
  beforeEach(() => {
    initialValue = true
    updateValue = false
    inputObject = createInputObjectMock()
  })

  it('renders without crashing when given required props', () => {
    setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })
  })

  it('sets initial value if provided', () => {
    inputObject = createInputObjectMock({
      value: initialValue,
    })

    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    const props = wrapper.find('input').props()
    expect(props).toBeTruthy()
    expect(getValue(props)).toBe(initialValue)
  })

  it('onChange is called with new value when value is changed', () => {
    inputObject = createInputObjectMock({ value: initialValue })
    const value = updateValue
    const e = { target: { value } }
    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    wrapper.find('input').simulate('change', e)

    expect(inputObject.onChange.mock.calls.length).toEqual(1)
    expect(inputObject.onChange.mock.calls[0]).toMatchObject([value])
  })

  it('value is updated if new value is provided through props', () => {
    inputObject = createInputObjectMock({
      value: initialValue,
    })
    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    const props = wrapper.find('input').props()
    expect(props).toBeTruthy()
    expect(getValue(props)).toBe(initialValue)

    inputObject.value = updateValue
    wrapper.setProps({ input: inputObject })

    const updatedProps = wrapper.find('input').props()
    expect(updatedProps).toBeTruthy()
    expect(getValue(updatedProps)).toBe(updateValue)
  })

  it('onFocus is called when input is focused', () => {
    inputObject = createInputObjectMock({})
    const e = {}
    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    wrapper.find('input').simulate('focus', e)

    expect(inputObject.onFocus.mock.calls.length).toEqual(1)
    expect(inputObject.onFocus.mock.calls[0]).toMatchObject([e])
  })

  it('onBlur is called when input is blurred', () => {
    inputObject = createInputObjectMock({})
    const e = {}
    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    wrapper.find('input').simulate('blur', e)
    expect(inputObject.onBlur.mock.calls.length).toEqual(1)
    expect(inputObject.onBlur.mock.calls[0]).toMatchObject([e])
  })
  it('click event result in onOhange called with updated value', () => {
    inputObject = createInputObjectMock({ value: true })
    const e = {}
    wrapper = setupTestComponent({
      component: <Checkbox input={inputObject} />,
      wrap: false,
    })

    wrapper.find('input').simulate('click', e)
    expect(inputObject.onChange.mock.calls.length).toEqual(1)
    expect(inputObject.onChange.mock.calls[0]).toEqual([false])
  })
})
