/* eslint-disable import/no-extraneous-dependencies */
import { withInfo } from '@storybook/addon-info'

export default function customStorybookWithInfo(options) {
  if (process.env.NODE_ENV === 'test') {
    return component => component
  }

  return withInfo(options)
}
