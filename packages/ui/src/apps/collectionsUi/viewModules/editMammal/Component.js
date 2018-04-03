import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MammalForm } from 'domainModules/collectionMammals/components'
import transformOutput from 'domainModules/collectionMammals/components/MammalForm/transformations/output'

import createLog from 'utilities/log'
import { globalSelectors as mammalSelectors } from 'domainModules/collectionMammals'
import { actionCreators as specimenActionCreators } from 'dataModules/specimenService'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const log = createLog('modules:editMammal:Component')

const mapStateToProps = (state, { match }) => {
  return {
    initialValues: mammalSelectors.getMammalFormInitialValues(
      state,
      match.params.specimenId
    ),
  }
}
const mapDispatchToProps = {
  getSpecimen: specimenActionCreators.getSpecimen,
  updateSpecimen: specimenActionCreators.updateSpecimen,
}

const propTypes = {
  getSpecimen: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateSpecimen: PropTypes.func.isRequired,
}

class EditMammal extends Component {
  componentWillMount() {
    this.props.getSpecimen({ id: this.props.match.params.specimenId })
  }

  render() {
    const {
      initialValues,
      match: { params: { specimenId } },
      updateSpecimen,
    } = this.props

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={formOutput => {
            return updateSpecimen({
              id: specimenId,
              ...transformOutput(formOutput),
            })
          }}
          initialValues={initialValues}
          mode="edit"
        />
      </PageTemplate>
    )
  }
}

EditMammal.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(EditMammal)
