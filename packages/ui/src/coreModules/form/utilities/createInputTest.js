/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'

const createInputObjectMock = (overrides = {}) => {
  return {
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onFocus: jest.fn(),
    ...overrides,
  }
}

export default function createInputTest({
  elementToSelect = 'input',
  getValue = props => props.value,
  initialValue = 'initialValue',
  InputComponent,
  updateValue = 'updateValue',
}) {
  let inputObject
  let wrapper
  beforeEach(() => {
    inputObject = createInputObjectMock()
  })

  it('renders without crashing when given required props', () => {
    setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })
  })

  it('sets initial value if provided', () => {
    inputObject = createInputObjectMock({
      value: initialValue,
    })

    wrapper = setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })

    const props = wrapper.find(elementToSelect).props()
    expect(props).toBeTruthy()
    expect(getValue(props)).toBe(initialValue)
  })

  it('onChange is called with new value when value is changed', () => {
    inputObject = createInputObjectMock({ value: initialValue })
    const value = updateValue
    const e = { target: { value } }
    wrapper = setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })

    wrapper.find(elementToSelect).simulate('change', e)

    expect(inputObject.onChange.mock.calls.length).toEqual(1)
    expect(inputObject.onChange.mock.calls[0]).toMatchObject([e, { value }])
  })

  it('value is updated if new value is provided through props', () => {
    inputObject = createInputObjectMock({
      value: initialValue,
    })
    wrapper = setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })

    const props = wrapper.find(elementToSelect).props()
    expect(props).toBeTruthy()
    expect(getValue(props)).toBe(initialValue)

    wrapper.setProps({ input: { ...inputObject, value: updateValue } })

    const updatedProps = wrapper.find(elementToSelect).props()
    expect(updatedProps).toBeTruthy()
    expect(getValue(updatedProps)).toBe(updateValue)
  })

  it('onFocus is called when input is focused', () => {
    inputObject = createInputObjectMock({})
    const e = {}
    wrapper = setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })

    wrapper.find(elementToSelect).simulate('focus', e)

    expect(inputObject.onFocus.mock.calls.length).toEqual(1)
    expect(inputObject.onFocus.mock.calls[0]).toMatchObject([e])
  })

  it('onBlur is called when input is blurred', () => {
    inputObject = createInputObjectMock({})
    const e = {}
    wrapper = setupTestComponent({
      component: <InputComponent input={inputObject} />,
      wrap: false,
    })

    wrapper.find(elementToSelect).simulate('blur', e)
    expect(inputObject.onBlur.mock.calls.length).toEqual(1)
    expect(inputObject.onBlur.mock.calls[0]).toMatchObject([e])
  })
}
