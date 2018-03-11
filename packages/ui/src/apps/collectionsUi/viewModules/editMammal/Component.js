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
import {
  actionCreators as localityActionCreators,
  globalSelectors as localitySelectors,
} from 'domainModules/localityService'
import { globalSelectors as storageSelectors } from 'domainModules/storageService'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = (state, { match }) => {
  return {
    hasCuratedLocalities: localitySelectors.getHasCuratedLocalities(state),
    individualGroup: mammalSelectors.getIndividualGroupBySpecimenId(
      state,
      match.params.specimenId
    ),
    physicalUnits: storageSelectors.getPhysicalUnits(state),
  }
}
const mapDispatchToProps = {
  getCuratedLocalities: localityActionCreators.getCuratedLocalities,
  getSpecimen: mammalActionCreators.getSpecimen,
  updateSpecimen: mammalActionCreators.updateSpecimen,
}

const propTypes = {
  getCuratedLocalities: PropTypes.func.isRequired,
  getSpecimen: PropTypes.func.isRequired,
  hasCuratedLocalities: PropTypes.bool.isRequired,
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
    this.props.getCuratedLocalities()
  }

  render() {
    const {
      hasCuratedLocalities,
      individualGroup,
      match: { params: { specimenId } },
      physicalUnits,
      updateSpecimen,
    } = this.props

    const initialData = transformInput({ individualGroup, physicalUnits })

    return (
      <PageTemplate>
        {hasCuratedLocalities &&
          individualGroup && (
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
