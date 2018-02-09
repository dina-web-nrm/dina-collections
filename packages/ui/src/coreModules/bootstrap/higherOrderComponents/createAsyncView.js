import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createLog from 'utilities/log'
import { DefaultLoader, DefaultWrapper } from '../components'

export default function createAsyncView({
  Loader = DefaultLoader,
  modules: modulesLoader,
  name,
  view: viewLoader,
  Wrapper = DefaultWrapper,
}) {
  const log = createLog(`modules:bootstrap:createAsyncView:${name}`)
  const load = () => {
    if (!modulesLoader) {
      return viewLoader().then(view => {
        return {
          modules: [],
          view,
        }
      })
    }

    return Promise.all(modulesLoader()).then(modules => {
      return viewLoader().then(view => {
        return {
          modules,
          view,
        }
      })
    })
  }

  const contextTypes = {
    store: PropTypes.object,
  }

  class AsyncLoader extends Component {
    constructor(props) {
      super(props)
      this.state = { FetchedComponent: null, loading: true }
    }

    componentDidMount() {
      this.mounting = true
      log.mount('Start')
      load().then(({ view, modules }) => {
        const { store } = this.context
        store.registerModules([view, ...modules])
        if (this.mounting) {
          this.setState({
            FetchedComponent: view.Component,
            loading: false,
          })
          log.mount('Done')
        }
      })
    }

    componentWillUnmount() {
      this.mounting = false
      log.unmount('Start')
      load().then(({ view, modules }) => {
        const { store } = this.context
        store.unregisterModules([view, ...modules])
        log.unmount('Done')
      })
    }

    render() {
      log.render('Render')
      const { FetchedComponent, loading } = this.state
      return (
        <Wrapper>
          {FetchedComponent && <FetchedComponent {...this.props} />}
          <Loader loading={loading} />
        </Wrapper>
      )
    }
  }

  AsyncLoader.contextTypes = contextTypes
  return AsyncLoader
}
