import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
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
  updateSpecimen: mammalActionCreators.updateSpecimen,
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
  updateSpecimen: PropTypes.func.isRequired,
}
const defaultProps = {
  individualGroup: undefined,
}

class EditMammal extends Component {
  componentWillMount() {
    this.props.getSpecimenById(this.props.match.params.specimenId)
  }

  render() {
    const { individualGroup, updateSpecimen } = this.props
    const initialData = transformInput(individualGroup)
    return (
      <PageTemplate>
        {individualGroup && (
          <MammalForm
            handleFormSubmit={updateSpecimen}
            initialData={initialData}
            mode="edit"
          />
        )}
      </PageTemplate>
    )
  }
}

EditMammal.propTypes = propTypes
EditMammal.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(EditMammal)
