/* eslint-disable no-console */
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createTestStore from 'utilities/test/createTestStore'
import defaultTestConfig from 'utilities/test/defaultTestConfig'
import { Container, Header, Segment } from 'semantic-ui-react'
import I18nProvider from 'coreModules/i18n/components/I18nProvider'

const defaultConfig = defaultTestConfig()

const createTitle = ({ context, title }) => {
  if (context) {
    return `${context.kind} - ${context.story}`
  }
  return title
}

export default function setupStorybookComponent({
  component,
  config: customConfig,
  context,
  fullExport = false,
  initialState,
  title = '',
  wrap = true,
}) {
  const config = customConfig || defaultConfig
  const store = createTestStore({ config, initialState })

  const wrappedComponent = wrap ? (
    <Container style={{ position: 'relative' }}>
      <Segment color="green">
        <Header
          as="h2"
          content={createTitle({
            context,
            title,
          })}
        />
        {component}
      </Segment>
    </Container>
  ) : (
    <div>
      <Header
        as="h2"
        content={createTitle({
          context,
          title,
        })}
        textAlign="center"
      />
      {component}
    </div>
  )

  const rootComponent = (
    <Provider store={store}>
      <ConnectedRouter history={config.routing}>
        <I18nProvider>{wrappedComponent}</I18nProvider>
      </ConnectedRouter>
    </Provider>
  )

  if (fullExport) {
    return {
      config,
      rootComponent,
      store,
    }
  }
  return rootComponent
}
