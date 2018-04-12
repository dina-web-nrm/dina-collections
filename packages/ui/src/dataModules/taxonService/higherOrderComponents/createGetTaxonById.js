/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import globalSelectors from '../globalSelectors'
import { getTaxon as getTaxonAC } from '../actionCreators'

const createGetTaxonById = (idPath = 'itemId') => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      itemId,
      taxon: !itemId ? null : globalSelectors.getTaxon(state, itemId),
    }
  }

  const mapDispathToProps = {
    getTaxon: getTaxonAC,
  }

  const propTypes = {
    getTaxon: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    taxon: PropTypes.object,
  }

  const defaultProps = {
    itemId: '',
    taxon: null,
  }

  class GetTaxonById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getTaxon({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
        this.props.getTaxon({ id: nextProps.itemId })
      }
    }

    render() {
      const { taxon } = this.props
      return <ComposedComponent taxon={taxon} {...this.props} />
    }
  }

  GetTaxonById.propTypes = propTypes
  GetTaxonById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(GetTaxonById)
}

export default createGetTaxonById
