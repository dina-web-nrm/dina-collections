/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import { times } from 'lodash'

import uiDescribe from 'utilities/test/uiDescribe'
import setupTestComponent from 'utilities/test/setupTestComponent'
import DropdownSearch from './index'

const getOptions = (count = 5) =>
  times(count, index => {
    const key = `${index}-key`
    const text = `${index}-text`
    const value = `${index}-value`

    return { key, text, value }
  })

uiDescribe('coreModules/form/components/DropdownSearch', () => {
  let baseInput
  let baseMeta
  let onChange
  let onSearchChange
  let options
  let wrapper

  beforeEach(() => {
    baseInput = { name: 'inputName' }
    baseMeta = { touched: false }
    onChange = jest.fn()
    onSearchChange = jest.fn()
    options = getOptions()
  })

  it('renders without crashing when given required props', () => {
    setupTestComponent({
      component: (
        <DropdownSearch
          input={baseInput}
          meta={baseMeta}
          module="module"
          name="name"
          onChange={onChange}
          onSearchChange={onSearchChange}
          options={options}
        />
      ),
    })
  })

  describe('text', () => {
    it('sets text from initialText if no value', () => {
      const initialText = 'initialText'

      wrapper = setupTestComponent({
        component: (
          <DropdownSearch
            initialText={initialText}
            input={baseInput}
            meta={baseMeta}
            module="module"
            name="name"
            onChange={onChange}
            onSearchChange={onSearchChange}
            options={options}
          />
        ),
      })

      expect(wrapper.find('Dropdown').props().text).toEqual(initialText)
    })

    it('sets text as input.value, overriding initialText', () => {
      const initialText = 'initialText'
      const value = 'someValue'

      wrapper = setupTestComponent({
        component: (
          <DropdownSearch
            initialText={initialText}
            input={{ ...baseInput, value }}
            meta={baseMeta}
            module="module"
            name="name"
            onChange={onChange}
            onSearchChange={onSearchChange}
            options={options}
          />
        ),
      })

      expect(wrapper.find('Dropdown').props().text).toEqual(value)
    })
  })

  describe('value', () => {
    it('has undefined value if uncontrolled', () => {
      wrapper = setupTestComponent({
        component: (
          <DropdownSearch
            input={baseInput}
            meta={baseMeta}
            module="module"
            name="name"
            onChange={onChange}
            onSearchChange={onSearchChange}
            options={options}
          />
        ),
      })

      expect(wrapper.find('Dropdown').props().value).toEqual(undefined)
    })

    it('has provided value if controlled', () => {
      const value = 'someValue'

      wrapper = setupTestComponent({
        component: (
          <DropdownSearch
            input={{ ...baseInput, value }}
            meta={baseMeta}
            module="module"
            name="name"
            onChange={onChange}
            onSearchChange={onSearchChange}
            options={options}
          />
        ),
      })

      expect(wrapper.find('Dropdown').props().value).toEqual(value)
    })
  })
})
