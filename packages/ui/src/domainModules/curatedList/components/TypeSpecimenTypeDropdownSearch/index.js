import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { DropdownSearch } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'

const mapStateToProps = state => {
  return {
    typeSpecimenTypeOptions: globalCrudSelectors.typeSpecimenType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  allTypeSpecimenTypeFetched: PropTypes.bool.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  typeSpecimenTypeOptions: PropTypes.array,
}

const defaultProps = {
  typeSpecimenTypeOptions: [],
}

class TypeSpecimenTypeDropdownSearch extends Component {
  render() {
    const {
      allTypeSpecimenTypeFetched,
      typeSpecimenTypeOptions,
      ...rest
    } = this.props

    if (!allTypeSpecimenTypeFetched) {
      return null
    }
    return (
      <DropdownSearch
        {...rest}
        options={typeSpecimenTypeOptions}
        type="dropdown-search-local"
      />
    )
  }
}

TypeSpecimenTypeDropdownSearch.defaultProps = defaultProps
TypeSpecimenTypeDropdownSearch.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'allTypeSpecimenTypeFetched',
    resource: 'typeSpecimenType',
  }),
  connect(mapStateToProps)
)(TypeSpecimenTypeDropdownSearch)
