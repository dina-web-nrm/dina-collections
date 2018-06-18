/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'common/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import withInfo from 'utilities/test/customStorybookWithInfo'
import ColumnLayout from './index'

const getColumnSpecification = (width, background = 'gray') => {
  return {
    renderColumn: () => {
      return <div style={{ background, height: '50px' }}>{width}</div>
    },
    width,
  }
}

storiesOf('coreModules/layout/ColumnLayout', module)
  .addDecorator(
    createStoryDecorator({
      wrap: false,
    })
  )
  .add(
    'One full-width column',
    withInfo({ propTables: [ColumnLayout] })(() => {
      const columns = [getColumnSpecification('100%')]
      return <ColumnLayout columns={columns} />
    })
  )
  .add(
    'Two columns with fixed widths',
    withInfo({ propTables: [ColumnLayout] })(() => {
      const columns = [
        getColumnSpecification('300px'),
        getColumnSpecification('150px', 'green'),
      ]
      return <ColumnLayout columns={columns} />
    })
  )
  .add(
    'Two columns with relative widths',
    withInfo({ propTables: [ColumnLayout] })(() => {
      const columns = [
        getColumnSpecification('30%'),
        getColumnSpecification('70%', 'green'),
      ]
      return <ColumnLayout columns={columns} />
    })
  )
  .add(
    'Three columns, two fixed width and one scrollable filling the rest',
    withInfo({ propTables: [ColumnLayout] })(() => {
      const columns = [
        getColumnSpecification('100px'),
        {
          renderColumn: () => {
            return (
              <div
                style={{
                  background: 'red',
                  height: '50px',
                  overflow: 'scroll',
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
        getColumnSpecification('30%', 'green'),
      ]
      return (
        <div style={{ height: '50px' }}>
          <ColumnLayout columns={columns} />
        </div>
      )
    })
  )
