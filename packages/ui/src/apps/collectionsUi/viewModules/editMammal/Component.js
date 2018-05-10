import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MammalForm } from 'domainModules/collectionMammals/components'
import nestedToCore from 'common/es5/formatObject/nestedToCore'
import createLog from 'utilities/log'
import { globalSelectors as mammalSelectors } from 'domainModules/collectionMammals'
import crudActionCreators from 'coreModules/crud/actionCreators'
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
  getSpecimen: crudActionCreators.specimen.getOne,
  updateSpecimen: crudActionCreators.specimen.update,
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
    this.props.getSpecimen({
      id: this.props.match.params.specimenId,
      include: ['featureTypes', 'physicalObjects', 'places', 'taxa'],
      relationships: ['all'],
    })
  }

  render() {
    const { initialValues, updateSpecimen } = this.props

    log.render()
    log.debug('initialValues', initialValues)
    return (
      <PageTemplate>
        <MammalForm
          handleFormSubmit={formOutput => {
            const item = nestedToCore({
              item: formOutput,
              type: 'specimen',
            })
            return updateSpecimen({
              item,
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
