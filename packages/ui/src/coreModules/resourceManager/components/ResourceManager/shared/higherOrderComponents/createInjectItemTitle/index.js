import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DefaultItemTitle from './DefaultItemTitle'

const propTypes = {
  item: PropTypes.object,
  ItemTitle: PropTypes.func,
  nestedItem: PropTypes.object,
}

const defaultProps = {
  item: undefined,
  ItemTitle: DefaultItemTitle,
  nestedItem: undefined,
}

const createInjectItemTitle = () => ComposedComponent => {
  class InjectItemTitle extends Component {
    render() {
      const { item, nestedItem, ItemTitle } = this.props

      if (!item && !nestedItem) {
        return <ComposedComponent {...this.props} />
      }

      const title = <ItemTitle item={item} nestedItem={nestedItem} />

      return <ComposedComponent {...this.props} itemTitle={title} />
    }
  }

  InjectItemTitle.propTypes = propTypes
  InjectItemTitle.defaultProps = defaultProps

  return InjectItemTitle
}

export default createInjectItemTitle
