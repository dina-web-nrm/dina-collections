import React from 'react'
import PropTypes from 'prop-types'
import { LAYOUT_SINGLE, LAYOUT_SPLIT, LAYOUT_MODAL } from '../../constants'
import ModalView from './views/Modal'
import SingleView from './views/Single'
import SplitView from './views/Split'

const propTypes = {
  layoutMode: PropTypes.oneOf([LAYOUT_SINGLE, LAYOUT_SPLIT, LAYOUT_MODAL])
    .isRequired,
  primaryBlock: PropTypes.node.isRequired,
  secondaryBlock: PropTypes.node,
}

const defaultProps = {
  secondaryBlock: null,
}

const Layout = ({ layoutMode, primaryBlock, secondaryBlock }) => {
  if (layoutMode === LAYOUT_SINGLE) {
    return <SingleView primaryBlock={primaryBlock} />
  }
  if (layoutMode === LAYOUT_SPLIT) {
    return (
      <SplitView primaryBlock={primaryBlock} secondaryBlock={secondaryBlock} />
    )
  }

  if (layoutMode === LAYOUT_MODAL) {
    return (
      <ModalView primaryBlock={primaryBlock} secondaryBlock={secondaryBlock} />
    )
  }

  throw new Error(`Unknown layoutMode ${layoutMode}`)
}

Layout.propTypes = propTypes
Layout.defaultProps = defaultProps

export default Layout
