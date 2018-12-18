import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { DropdownSearch } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import crudSelectors from 'coreModules/crud/globalSelectors'

const mapStateToProps = state => {
  return {
    preparationTypeOptions: crudSelectors.preparationType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  allPreparationTypesFetched: PropTypes.bool.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  preparationTypeOptions: PropTypes.array,
}

const defaultProps = {
  preparationTypeOptions: [],
}

class PreparationTypeDropdownSearch extends Component {
  render() {
    const {
      allPreparationTypesFetched,
      preparationTypeOptions,
      ...rest
    } = this.props
    if (!allPreparationTypesFetched) {
      return null
    }
    return (
      <DropdownSearch
        {...rest}
        options={preparationTypeOptions}
        type="dropdown-search-local"
      />
    )
  }
}

PreparationTypeDropdownSearch.defaultProps = defaultProps
PreparationTypeDropdownSearch.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'allPreparationTypesFetched',
    resource: 'preparationType',
  }),
  connect(mapStateToProps)
)(PreparationTypeDropdownSearch)
