import config from 'config'
/* eslint-disable import/no-extraneous-dependencies */
import { withInfo } from '@storybook/addon-info'

export default function customStorybookWithInfo(options) {
  if (config.isTest) {
    return component => component
  }

  return withInfo(options)
}
