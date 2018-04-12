import React from 'react'
import PropTypes from 'prop-types'
import { MODAL, SINGLE, SPLIT } from '../../constants'
import ModalView from './views/Modal'
import SingleView from './views/Single'
import SplitView from './views/Split'

const propTypes = {
  layoutMode: PropTypes.oneOf([MODAL, SINGLE, SPLIT]).isRequired,
  primaryBlock: PropTypes.node.isRequired,
  secondaryBlock: PropTypes.node,
}

const defaultProps = {
  layoutMode: SINGLE,
  secondaryBlock: null,
}

const Layout = ({ layoutMode, primaryBlock, secondaryBlock }) => {
  if (layoutMode === SINGLE) {
    return <SingleView primaryBlock={primaryBlock} />
  }

  if (layoutMode === SPLIT) {
    return (
      <SplitView primaryBlock={primaryBlock} secondaryBlock={secondaryBlock} />
    )
  }

  if (layoutMode === MODAL) {
    return (
      <ModalView primaryBlock={primaryBlock} secondaryBlock={secondaryBlock} />
    )
  }

  throw new Error(`Unknown layoutMode ${layoutMode}`)
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

export default Layout
