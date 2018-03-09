import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'

import {
  actionCreators as mammalActionCreators,
  globalSelectors as mammalSelectors,
} from 'domainModules/collectionMammals'
import { globalSelectors as storageSelectors } from 'domainModules/storageService'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = (state, { match }) => {
  return {
    individualGroup: mammalSelectors.getIndividualGroupBySpecimenId(
      state,
      match.params.specimenId
    ),
    physicalUnits: storageSelectors.getPhysicalUnits(state),
  }
}
const mapDispatchToProps = {
  getSpecimen: mammalActionCreators.getSpecimen,
  updateSpecimen: mammalActionCreators.updateSpecimen,
}

const propTypes = {
  getSpecimen: PropTypes.func.isRequired,
  individualGroup: PropTypes.shape({
    // TODO: define and possibly centralize propTypes for individualGroup
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  physicalUnits: PropTypes.object.isRequired,
  updateSpecimen: PropTypes.func.isRequired,
}
const defaultProps = {
  individualGroup: undefined,
}

class EditMammal extends Component {
  componentWillMount() {
    this.props.getSpecimen({ id: this.props.match.params.specimenId })
  }

  render() {
    const {
      individualGroup,
      match: { params: { specimenId } },
      physicalUnits,
      updateSpecimen,
    } = this.props

    const initialData = transformInput({ individualGroup, physicalUnits })

    return (
      <PageTemplate>
        {individualGroup && (
          <MammalForm
            handleFormSubmit={formOutput => {
              return updateSpecimen({
                id: specimenId,
                ...transformOutput(formOutput),
              })
            }}
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
