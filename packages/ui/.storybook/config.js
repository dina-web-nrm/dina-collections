import { configure } from '@storybook/react'

function loadStories() {
  require('./imports.js')
}

configure(loadStories, module)
