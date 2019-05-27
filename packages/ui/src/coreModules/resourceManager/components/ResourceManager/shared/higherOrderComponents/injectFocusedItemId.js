import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from 'coreModules/resourceManager/keyObjectModule'

const { get } = keyObjectGlobalSelectors

const mapStateToProps = (state, { managerScope }) => {
  return {
    focusedItemId: get[':managerScope.focusedItemId'](state, {
      managerScope,
    }),
    focusItemIdWhenLoaded: get[':managerScope.focusItemIdWhenLoaded'](state, {
      managerScope,
    }),
  }
}
const mapDispatchToProps = {
  setFocusedItemIdInManagerScope:
    keyObjectActionCreators.set[':managerScope.focusedItemId'],
  setFocusItemIdWhenLoadedInManagerScope:
    keyObjectActionCreators.set[':managerScope.focusItemIdWhenLoaded'],
}

const propTypes = {
  focusedItemId: PropTypes.string,
  managerScope: PropTypes.string.isRequired,
  setFocusedItemIdInManagerScope: PropTypes.func.isRequired,
  setFocusItemIdWhenLoadedInManagerScope: PropTypes.func.isRequired,
}
const defaultProps = {
  focusedItemId: undefined,
}

const injectFocusedItemId = ComposedComponent => {
  const FocusedItemIdInjector = props => {
    const {
      focusedItemId,
      managerScope,
      setFocusedItemIdInManagerScope,
      setFocusItemIdWhenLoadedInManagerScope,
    } = props

    const handleSetFocusedItemId = useMemo(() => {
      return function setFocusedItemId(itemId) {
        setFocusedItemIdInManagerScope(itemId, { managerScope })
      }
    }, [managerScope, setFocusedItemIdInManagerScope])

    const handleSetFocusItemIdWhenLoaded = useMemo(() => {
      return function setFocusItemIdWhenLoaded(itemId) {
        setFocusItemIdWhenLoadedInManagerScope(itemId, { managerScope })
      }
    }, [managerScope, setFocusItemIdWhenLoadedInManagerScope])

    return (
      <ComposedComponent
        {...props}
        focusedItemId={focusedItemId}
        setFocusedItemId={handleSetFocusedItemId}
        setFocusItemIdWhenLoaded={handleSetFocusItemIdWhenLoaded}
      />
    )
  }

  FocusedItemIdInjector.propTypes = propTypes
  FocusedItemIdInjector.defaultProps = defaultProps

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(FocusedItemIdInjector)
}

export default injectFocusedItemId
