import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { StorageLocationDropdownSearch } from 'domainModules/storage/components'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import curatedListSelectors from 'domainModules/curatedList/globalSelectors'
import { ALL } from 'domainModules/storage/constants'
import createLog from 'utilities/log'
import CuratorialAssessmentsList from './CuratorialAssessmentsList'

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectContent'
)

const mapStateToProps = (state, { preparationType, category }) => {
  // TODO use selector for preparationType options
  return {
    preparationTypeOptions: curatedListSelectors.getPreparationTypeOptions(
      state,
      (preparationType && preparationType.category) || category || 'undefined'
    ),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  curatorialAssessments: PropTypes.array,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  preparationTypeOptions: PropTypes.array,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  curatorialAssessments: undefined,
  preparationTypeOptions: [],
}

function PhysicalObjectContent({
  changeFieldValue,
  curatorialAssessments,
  formValueSelector,
  preparationTypeOptions,
  getPath,
  removeArrayFieldByIndex,
}) {
  log.render()
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Row>
        <Grid.Column computer={8} mobile={8} tablet={8}>
          <Field
            autoComplete="off"
            component={DropdownSearch}
            module="collectionMammals"
            name={getPath('preparationType.id')}
            options={preparationTypeOptions}
            type="dropdown-search-local"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={8} mobile={8} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('description')}
            type="input-text"
          />
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={StorageLocationDropdownSearch}
            group={ALL}
            module="collectionMammals"
            name={getPath('physicalObject.storageLocation.id')}
            showParentName
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={8} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('physicalObject.storageLocationText')}
            type="input-text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <CuratorialAssessmentsList
            changeFieldValue={changeFieldValue}
            curatorialAssessments={curatorialAssessments}
            formValueSelector={formValueSelector}
            removeArrayFieldByIndex={removeArrayFieldByIndex}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

PhysicalObjectContent.propTypes = propTypes
PhysicalObjectContent.defaultProps = defaultProps

export default compose(
  createGetItemById({
    idPath: 'preparationTypeId',
    relationships: null,
    resource: 'preparationType',
  }),
  connect(mapStateToProps),
  pathBuilder()
)(PhysicalObjectContent)
