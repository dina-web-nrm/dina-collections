/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import RowLayout from './index'

const getRowSpecification = (height, background = 'gray') => {
  return {
    height,
    renderRow: () => {
      return (
        <div style={{ background, height: '100%', width: '100%' }}>
          {height}
        </div>
      )
    },
  }
}

storiesOf('coreModules/layout/RowLayout', module)
  .addDecorator(
    createStoryDecorator({
      wrap: false,
    })
  )
  .add(
    'One full-height column',
    withInfo({ propTables: [RowLayout] })(() => {
      const rows = [getRowSpecification('100%')]
      return <RowLayout rows={rows} />
    })
  )
  .add(
    'Two rows with fixed heights',
    withInfo({ propTables: [RowLayout] })(() => {
      const rows = [
        getRowSpecification('300px'),
        getRowSpecification('150px', 'green'),
      ]
      return <RowLayout rows={rows} />
    })
  )
  .add(
    'Two rows with relative heights',
    withInfo({ propTables: [RowLayout] })(() => {
      const rows = [
        getRowSpecification('30%'),
        getRowSpecification('70%', 'green'),
      ]
      return <RowLayout rows={rows} />
    })
  )
  .add(
    'Three rows, two fixed height and one filling the rest',
    withInfo({ propTables: [RowLayout] })(() => {
      const rows = [
        getRowSpecification('100px'),
        {
          height: undefined,
          renderRow: () => {
            return (
              <div style={{ background: 'red', height: '100%', width: '100%' }}>
                filling up rest of height
              </div>
            )
          },
        },
        getRowSpecification('30%', 'green'),
      ]
      return <RowLayout rows={rows} />
    })
  )
  .add(
    'Three rows, two fixed height and one scrollable filling the rest (width of container 100px)',
    withInfo({ propTables: [RowLayout] })(() => {
      const rows = [
        getRowSpecification('100px'),
        {
          renderRow: () => {
            return (
              <div
                style={{
                  background: 'red',
                  height: '100%',
                  overflow: 'scroll',
                  width: '100%',
                }}
              >
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
                filling up rest of width with enough text to be scrollable
              </div>
            )
          },
          width: undefined,
        },
        getRowSpecification('30%', 'green'),
      ]
      return (
        <div style={{ height: '100%', overflow: 'hidden', width: '100px' }}>
          <RowLayout rows={rows} />
        </div>
      )
    })
  )
