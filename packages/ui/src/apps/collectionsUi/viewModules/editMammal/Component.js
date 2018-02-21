import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MammalForm } from 'domainModules/collectionMammals/components'
import {
  actionCreators as mammalActionCreators,
  globalSelectors as mammalSelectors,
} from 'domainModules/collectionMammals'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = (state, { match }) => {
  return {
    individualGroup: mammalSelectors.getIndividualGroupBySpecimenId(
      state,
      match.params.specimenId
    ),
  }
}
const mapDispatchToProps = {
  getSpecimenById: mammalActionCreators.getSpecimenById,
  updateIndividualGroup: mammalActionCreators.updateIndividualGroup,
}

const propTypes = {
  getSpecimenById: PropTypes.func.isRequired,
  individualGroup: PropTypes.shape({
    // TODO: define and possibly centralize propTypes for individualGroup
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateIndividualGroup: PropTypes.func.isRequired,
}
const defaultProps = {
  individualGroup: undefined,
}

class EditMammal extends Component {
  componentWillMount() {
    this.props.getSpecimenById(this.props.match.params.specimenId)
  }

  render() {
    const { individualGroup, updateIndividualGroup } = this.props

    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={updateIndividualGroup}
          individualGroup={individualGroup}
          mode="edit"
        />
      </PageTemplate>
    )
  }
}

EditMammal.propTypes = propTypes
EditMammal.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(EditMammal)
