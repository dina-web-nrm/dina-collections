import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createLog from 'utilities/log'

export default function createSyncView({ modules = [], name, view, Wrapper }) {
  const log = createLog(`modules:bootstrap:createSyncView:${name}`)
  let mounting = false
  const contextTypes = {
    store: PropTypes.object,
  }

  class SyncLoader extends Component {
    componentWillMount() {
      mounting = true
      log.mount('Start')
      const { store } = this.context
      store.registerModules([view, ...modules])
      log.mount('Done')
    }

    componentDidMount() {
      mounting = false
    }

    componentWillUnmount() {
      /*
      * If the same component is remounted componentWillUnmount
      * of the old component will be called after componentWillMount
      * for the new component and because of that this check is needed
      * to not immediately remove the newly mounted component
      */
      if (!mounting) {
        log.unmount('Start')
        const { store } = this.context
        store.unregisterModules([view, ...modules])
        log.unmount('Done')
      }
    }

    render() {
      log.render('Render')
      const SyncComponent = view.Component

      if (!Wrapper) {
        return <SyncComponent {...this.props} />
      }
      return <Wrapper>{<SyncComponent {...this.props} />}</Wrapper>
    }
  }

  SyncLoader.contextTypes = contextTypes
  return SyncLoader
}
