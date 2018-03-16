import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators as specimenActionCreators } from 'domainModules/specimenService'
import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import {
  actionCreators as curatedListActionCreators,
  globalSelectors as curatedListSelectors,
} from 'domainModules/curatedListService'
import {
  actionCreators as localityActionCreators,
  globalSelectors as localitySelectors,
} from 'domainModules/localityService'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = state => {
  return {
    hasCuratedLocalities: localitySelectors.getHasCuratedLocalities(state),
    hasFeatureObservationTypes: curatedListSelectors.getHasFeatureObservationTypes(
      state
    ),
  }
}
const mapDispatchToProps = {
  createSpecimen: specimenActionCreators.createSpecimen,
  getCuratedLocalities: localityActionCreators.getCuratedLocalities,
  getFeatureObservationTypes:
    curatedListActionCreators.getFeatureObservationTypes,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  getFeatureObservationTypes: PropTypes.func.isRequired,
  hasCuratedLocalities: PropTypes.bool.isRequired,
  hasFeatureObservationTypes: PropTypes.bool.isRequired,
}

class RegisterMammal extends Component {
  componentWillMount() {
    this.props.getCuratedLocalities()
    this.props.getFeatureObservationTypes()
  }

  render() {
    const {
      createSpecimen,
      hasCuratedLocalities,
      hasFeatureObservationTypes,
    } = this.props

    const initialData = transformInput({})
    return (
      <PageTemplate>
        {hasCuratedLocalities &&
          hasFeatureObservationTypes && (
            <MammalForm
              handleFormSubmit={formOutput => {
                return createSpecimen(transformOutput(formOutput))
              }}
              initialData={initialData}
              initialValues={initialData}
              mode="register"
              redirectOnSuccess
            />
          )}
      </PageTemplate>
    )
  }
}

RegisterMammal.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMammal)
