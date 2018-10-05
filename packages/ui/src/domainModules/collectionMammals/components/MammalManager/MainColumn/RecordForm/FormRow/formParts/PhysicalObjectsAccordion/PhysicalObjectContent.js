import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Remarks } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { StorageLocationDropdownPickerSearch } from 'domainModules/storage/components'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import curatedListSelectors from 'domainModules/curatedList/globalSelectors'
import { ALL } from 'domainModules/storage/constants'
import createLog from 'utilities/log'
import CuratorialAssessmentsList from './CuratorialAssessmentsList'

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectContent'
)

const mapStateToProps = (state, { category, preparationType }) => {
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
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
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
  handleSetInactive,
  index,
  preparationTypeOptions,
  getPath,
  getTranslationPath,
  removeArrayFieldByIndex,
}) {
  log.render()
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Row className="relaxed">
        <Grid.Column width={9}>
          <Field
            autoComplete="off"
            component={DropdownSearch}
            disableClearValue
            module="collectionMammals"
            name={getPath('preparationType.id')}
            options={preparationTypeOptions}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <Field
            autoComplete="off"
            component={StorageLocationDropdownPickerSearch}
            group={ALL}
            module="collectionMammals"
            name={getPath('physicalObject.storageLocation.id')}
            showParentName
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <CuratorialAssessmentsList
            changeFieldValue={changeFieldValue}
            curatorialAssessments={curatorialAssessments}
            removeArrayFieldByIndex={removeArrayFieldByIndex}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={Remarks}
            emptyStateTextKey="remarks.emptyState.physicalObject"
            model="specimen"
            module="collectionMammals"
            name={getPath('description')}
            showParentName
          />
        </Grid.Column>
        <Grid.Column textAlign="right" width={16}>
          <Button
            basic
            onClick={() => {
              handleSetInactive(index)
              removeArrayFieldByIndex(getTranslationPath(), index)
            }}
            type="button"
          >
            Remove
          </Button>
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
