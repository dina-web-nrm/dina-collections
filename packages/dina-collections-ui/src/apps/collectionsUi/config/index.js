import rootConfig from 'config'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const config = {
  api: {
    enableEndpointMocks: rootConfig.mock,
  },
  devToolsExtension:
    rootConfig.isDevelopment && typeof devToolsExtension === 'function',
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'en',
    language: 'en',
    translations: {
      common: {
        yes: {
          en: 'yes',
          sv: 'ja',
        },
      },
    },
  },
  logger: {
    collapsed: true,
    diff: true,
  },
  routing: history,
  size: {
    // maxWidts from https://semantic-ui.com/elements/container.html
    breakpoints: [
      {
        maxWidth: 768,
        size: 'small',
      },
      {
        maxWidth: 1200,
        size: 'medium',
      },
      {
        size: 'large',
      },
    ],
  },
}

export default config
