import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultItemTitle from './DefaultItemTitle'

const propTypes = {
  ItemTitle: PropTypes.func,
  nestedItem: PropTypes.object,
}

const defaultProps = {
  ItemTitle: DefaultItemTitle,
  nestedItem: undefined,
}

const createInjectItemTitle = () => ComposedComponent => {
  class InjectItemTitle extends Component {
    render() {
      const { nestedItem, ItemTitle } = this.props

      if (!nestedItem) {
        return <ComposedComponent {...this.props} />
      }

      const title = <ItemTitle nestedItem={nestedItem} />

      return <ComposedComponent {...this.props} itemTitle={title} />
    }
  }

  InjectItemTitle.propTypes = propTypes
  InjectItemTitle.defaultProps = defaultProps

  return InjectItemTitle
}

export default createInjectItemTitle
