import uiDescribe from 'utilities/test/uiDescribe'
import initStoryshots from '@storybook/addon-storyshots'

uiDescribe('storyshots', () => {
  jest.mock('react-dom', () => {
    return {
      findDOMNode: () => {
        return {}
      },
      render: () => null,
      unmountComponentAtNode: () => null,
    }
  })

  initStoryshots({})
})
