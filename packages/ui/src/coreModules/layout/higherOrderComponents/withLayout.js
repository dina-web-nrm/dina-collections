/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { actionCreators, globalSelectors } from '../keyObjectModule'

const withLayout = (layoutName = 'default') => ComposedComponent => {
  const mapStateToProps = (state, { name }) => ({
    layoutMode: globalSelectors.get[':name.layoutMode'](state, {
      name: name || layoutName, // prefer prop name, if provided
    }),
  })

  const mapDispatchToProps = {
    setLayoutMode: actionCreators.set[':name.layoutMode'],
  }

  const propTypes = {
    layoutMode: PropTypes.string,
    name: PropTypes.string,
    setLayoutMode: PropTypes.func.isRequired,
  }
  const defaultProps = {
    layoutMode: undefined,
    name: undefined,
  }

  class LayoutHoc extends Component {
    constructor(props) {
      super(props)
      this.setLayoutMode = this.setLayoutMode.bind(this)
      this.setLayoutModeByName = this.setLayoutModeByName.bind(this)
    }

    setLayoutMode(value) {
      return this.props.setLayoutMode(value, {
        name: this.props.name || layoutName,
      })
    }

    setLayoutModeByName(name, value) {
      return this.props.setLayoutMode(value, { name })
    }

    render() {
      const { layoutMode } = this.props
      return (
        <ComposedComponent
          {...this.props}
          layoutMode={layoutMode}
          setLayoutMode={this.setLayoutMode}
          setLayoutModeByName={this.setLayoutModeByName}
        />
      )
    }
  }

  LayoutHoc.propTypes = propTypes
  LayoutHoc.defaultProps = defaultProps

  return compose(connect(mapStateToProps, mapDispatchToProps))(LayoutHoc)
}

export default withLayout
