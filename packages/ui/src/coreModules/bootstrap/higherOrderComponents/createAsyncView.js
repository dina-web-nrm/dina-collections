import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createLog from 'utilities/log'
import {
  DefaultLoader,
  DefaultWrapper,
  DefaultLoadingError,
} from '../components'

export default function createAsyncView({
  Loader = DefaultLoader,
  LoadingError = DefaultLoadingError,
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
    return Promise.resolve().then(() => {
      return Promise.all(modulesLoader()).then(modules => {
        return viewLoader().then(view => {
          return {
            modules,
            view,
          }
        })
      })
    })
  }

  const contextTypes = {
    store: PropTypes.object,
  }

  class AsyncLoader extends Component {
    constructor(props) {
      super(props)
      this.state = {
        FetchedComponent: null,
        loading: true,
        loadingError: null,
        loadingFailed: false,
      }
    }

    componentDidMount() {
      this.mounting = true
      log.mount('Start')
      load()
        .then(({ view, modules }) => {
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
        .catch(err => {
          this.setState({
            loading: false,
            loadingError: err,
            loadingFailed: true,
          })
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
      const {
        FetchedComponent,
        loading,
        loadingError,
        loadingFailed,
      } = this.state
      return (
        <Wrapper>
          {loadingFailed && <LoadingError error={loadingError} />}
          {FetchedComponent && <FetchedComponent {...this.props} />}
          <Loader loading={loading} />
        </Wrapper>
      )
    }
  }

  AsyncLoader.contextTypes = contextTypes
  return AsyncLoader
}
