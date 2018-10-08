import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch } from 'coreModules/form/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'

const mapStateToProps = state => {
  return {
    causeOfDeathTypeOptions: globalCrudSelectors.causeOfDeathType.getAllAsOptions(
      state
    ),
  }
}

const propTypes = {
  allDeathTypeFetched: PropTypes.bool.isRequired,
  causeOfDeathTypeOptions: PropTypes.array,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
}

const defaultProps = {
  causeOfDeathTypeOptions: [],
}

class CauseOfDeathDropdownSearch extends Component {
  render() {
    const { allDeathTypeFetched, causeOfDeathTypeOptions, ...rest } = this.props

    if (!allDeathTypeFetched) {
      return null
    }
    return (
      <Grid.Column width={16}>
        <DropdownSearch
          {...rest}
          options={causeOfDeathTypeOptions}
          type="dropdown-search-local"
        />
      </Grid.Column>
    )
  }
}

CauseOfDeathDropdownSearch.defaultProps = defaultProps
CauseOfDeathDropdownSearch.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allDeathTypeFetched',
    resource: 'causeOfDeathType',
  }),
  connect(mapStateToProps)
)(CauseOfDeathDropdownSearch)
