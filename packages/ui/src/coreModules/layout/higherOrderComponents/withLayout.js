/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actionCreators, globalSelectors } from '../keyObjectModule'

export default function withLayout(ComposedComponent) {
  const mapStateToProps = state => ({
    layoutMode: globalSelectors.get.layoutMode(state),
  })

  const mapDispathToProps = {
    setLayoutMode: actionCreators.set.layoutMode,
  }

  const propTypes = {
    layoutMode: PropTypes.string.isRequired,
    setLayoutMode: PropTypes.func.isRequired,
  }

  class LayoutHoc extends Component {
    render() {
      const { setLayoutMode, layoutMode } = this.props
      return (
        <ComposedComponent
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          {...this.props}
        />
      )
    }
  }

  LayoutHoc.propTypes = propTypes
  return compose(connect(mapStateToProps, mapDispathToProps))(LayoutHoc)
}
