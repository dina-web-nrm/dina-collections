import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { actionCreators as mammalActionCreators } from 'domainModules/collectionMammals'
import { MammalForm } from 'domainModules/collectionMammals/components'
import transformInput from 'domainModules/collectionMammals/components/MammalForm/transformations/input'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'
import {
  actionCreators as localityActionCreators,
  globalSelectors as localitySelectors,
} from 'domainModules/localityService'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapStateToProps = state => {
  return {
    hasCuratedLocalities: localitySelectors.getHasCuratedLocalities(state),
  }
}
const mapDispatchToProps = {
  createSpecimen: mammalActionCreators.createSpecimen,
  getCuratedLocalities: localityActionCreators.getCuratedLocalities,
}

const propTypes = {
  createSpecimen: PropTypes.func.isRequired,
  getCuratedLocalities: PropTypes.func.isRequired,
  hasCuratedLocalities: PropTypes.bool.isRequired,
}

class RegisterMammal extends Component {
  componentWillMount() {
    this.props.getCuratedLocalities()
  }

  render() {
    const { createSpecimen, hasCuratedLocalities } = this.props

    const initialData = transformInput({})
    return (
      <PageTemplate>
        {hasCuratedLocalities && (
          <MammalForm
            handleFormSubmit={formOutput => {
              return createSpecimen(transformOutput(formOutput))
            }}
            initialData={initialData}
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
