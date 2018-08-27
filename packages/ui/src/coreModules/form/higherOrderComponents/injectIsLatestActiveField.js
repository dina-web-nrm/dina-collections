import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import formSelectors from '../globalSelectors'

const getIsLatestActiveField = (props, isLatestActiveField) => {
  const { currentActiveFormField, isActiveNow } = props
  return (
    isActiveNow || (isLatestActiveField && currentActiveFormField === undefined)
  )
}

const mapStateToProps = (state, { meta }) => {
  if (!meta || !meta.form) {
    throw new Error('missing meta.form')
  }

  return {
    currentActiveFormField: formSelectors.getFormActive(state, meta.form),
    isActiveNow: meta.active,
  }
}

const propTypes = {
  currentActiveFormField: PropTypes.string,
  isActiveNow: PropTypes.bool.isRequired,
}

const defaultProps = {
  currentActiveFormField: undefined,
}

export default function injectIsLatestActiveField(ComposedComponent) {
  class LatestActiveFieldInjector extends Component {
    constructor(props) {
      super(props)
      this.setAsLatestActiveField = this.setAsLatestActiveField.bind(this)
      this.state = {
        isLatestActiveField: getIsLatestActiveField(props, false),
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        this.props.isActiveNow !== nextProps.isActiveNow ||
        this.props.currentActiveFormField !== nextProps.currentActiveFormField
      ) {
        this.setState({
          isLatestActiveField: getIsLatestActiveField(
            nextProps,
            this.state.isLatestActiveField
          ),
        })
      }
    }

    setAsLatestActiveField(event) {
      if (event) event.preventDefault()
      this.setState({ isLatestActiveField: true })
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          isLatestActiveField={this.state.isLatestActiveField}
          setAsLatestActiveField={this.setAsLatestActiveField}
        />
      )
    }
  }

  LatestActiveFieldInjector.defaultProps = defaultProps
  LatestActiveFieldInjector.propTypes = propTypes

  return compose(connect(mapStateToProps))(LatestActiveFieldInjector)
}
