/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import objectPath from 'object-path'

import config from 'config'
import globalSelectors from '../globalSelectors'
import { getTaxonName as getTaxonNameAC } from '../actionCreators'

const createGetTaxonNameById = (idPath = 'itemId') => ComposedComponent => {
  const mapStateToProps = (state, ownProps) => {
    const itemId = objectPath.get(ownProps, idPath)
    return {
      itemId,
      taxonName: !itemId ? null : globalSelectors.getTaxonName(state, itemId),
    }
  }

  const mapDispathToProps = {
    getTaxonName: getTaxonNameAC,
  }

  const propTypes = {
    getTaxonName: PropTypes.func.isRequired,
    itemId: PropTypes.string,
    taxonName: PropTypes.object,
  }

  const defaultProps = {
    itemId: '',
    taxonName: null,
  }

  class GetTaxonNameById extends Component {
    componentDidMount() {
      const { itemId } = this.props
      if (itemId && !config.isTest) {
        this.props.getTaxonName({ id: itemId })
      }
    }

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.itemId &&
        nextProps.itemId !== this.props.itemId &&
        !config.isTest
      ) {
        this.props.getTaxonName({ id: nextProps.itemId })
      }
    }

    render() {
      const { taxonName } = this.props
      return <ComposedComponent taxonName={taxonName} {...this.props} />
    }
  }

  GetTaxonNameById.propTypes = propTypes
  GetTaxonNameById.defaultProps = defaultProps
  return compose(connect(mapStateToProps, mapDispathToProps))(GetTaxonNameById)
}

export default createGetTaxonNameById
