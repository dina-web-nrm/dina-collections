import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { StorageLocationSearch } from 'domainModules/storage/components'
import { createGetDistinguishedUnitTypeById } from 'dataModules/curatedListService/higherOrderComponents'
import curatedListSelectors from 'domainModules/curatedList/globalSelectors'
import {
  SKELETON,
  SKIN,
  WET_PREPARATION,
} from 'domainModules/curatedList/constants'
import createLog from 'utilities/log'
import CuratorialAssessmentsList from './CuratorialAssessmentsList'

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectContent'
)

const mapStateToProps = (state, { distinguishedUnitType, category }) => {
  return {
    distinguishedUnitTypeOptions: curatedListSelectors.getDistinguishedUnitTypeOptions(
      state,
      (distinguishedUnitType && distinguishedUnitType.category) ||
        category ||
        'undefined'
    ),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  curatorialAssessments: PropTypes.array,
  distinguishedUnitType: PropTypes.shape({
    category: PropTypes.oneOf([SKELETON, SKIN, WET_PREPARATION]),
  }),
  distinguishedUnitTypeOptions: PropTypes.array,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  curatorialAssessments: undefined,
  distinguishedUnitType: undefined,
  distinguishedUnitTypeOptions: [],
}

function PhysicalObjectContent({
  distinguishedUnitType,
  changeFieldValue,
  curatorialAssessments,
  distinguishedUnitTypeOptions,
  getPath,
  i18n: { moduleTranslate },
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
            label={moduleTranslate({
              textKey: `preparationType.${(distinguishedUnitType &&
                distinguishedUnitType.category) ||
                'undefined'}`,
            })}
            module="collectionMammals"
            name={getPath('distinguishedUnitType.id')}
            options={distinguishedUnitTypeOptions}
            type="dropdown-search-local"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={8} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={moduleTranslate({ textKey: 'description' })}
            module="collectionMammals"
            name={getPath('description')}
            type="input-text"
          />
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={StorageLocationSearch}
            label={moduleTranslate({ textKey: 'normalStorageLocation' })}
            module="collectionMammals"
            name={getPath('physicalUnit.storageLocation.id')}
            type="search-connect"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <CuratorialAssessmentsList
            changeFieldValue={changeFieldValue}
            curatorialAssessments={curatorialAssessments}
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
  createGetDistinguishedUnitTypeById('distinguishedUnitTypeId'),
  connect(mapStateToProps),
  withI18n({
    module: 'collectionMammals',
    scope: 'distinguishedUnits',
  }),
  pathBuilder()
)(PhysicalObjectContent)
