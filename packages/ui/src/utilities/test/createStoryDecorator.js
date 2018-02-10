/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createTestStore from 'utilities/test/createTestStore'
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import { Container, Segment } from 'semantic-ui-react'
import I18nProvider from 'coreModules/i18n/components/I18nProvider'

const defaultConfig = defaultTestConfig()

export default function createStoryDecorator(
  { config: customConfig, initialState, wrap = true } = {}
) {
  return getStory => {
    const config = customConfig || defaultConfig
    const store = createTestStore({ config, initialState })

    if (wrap) {
      return (
        <Provider store={store}>
          <ConnectedRouter history={config.routing}>
            <I18nProvider>
              <Container style={{ position: 'relative' }}>
                <Segment color="green">{getStory()}</Segment>
              </Container>
            </I18nProvider>
          </ConnectedRouter>
        </Provider>
      )
    }

    return (
      <Provider store={store}>
        <ConnectedRouter history={config.routing}>
          <I18nProvider>{getStory()}</I18nProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}
