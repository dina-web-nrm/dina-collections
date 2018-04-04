import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { ThreeColumnGrid } from 'coreModules/commonUi/components'
import { Icon, Label } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { createGetDistinguishedUnitTypeById } from 'dataModules/curatedListService/higherOrderComponents'
import { createGetStorageLocationById } from 'dataModules/storageService/higherOrderComponents'
import createLog from 'utilities/log'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'distinguishedUnits',
})

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectTitle'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  category: PropTypes.string,
  curatorialAssessments: PropTypes.array,
  distinguishedUnitType: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
  }),
  storageLocation: PropTypes.shape({ name: PropTypes.string.isRequired }),
}
const defaultProps = {
  category: undefined,
  curatorialAssessments: undefined,
  distinguishedUnitType: undefined,
  storageLocation: undefined,
}

function PhysicalObjectTitle({
  active,
  category,
  curatorialAssessments,
  distinguishedUnitType,
  storageLocation,
}) {
  if (active) {
    return <ThreeColumnGrid left={<Icon name="dropdown" />} />
  }

  const lastCuratorialAssessment =
    curatorialAssessments &&
    curatorialAssessments.length &&
    curatorialAssessments[curatorialAssessments.length - 1]

  log.render()
  return (
    <ThreeColumnGrid
      center={
        storageLocation && (
          <span style={{ fontWeight: 'normal' }}>{storageLocation.name}</span>
        )
      }
      left={
        distinguishedUnitType || category ? (
          <React.Fragment>
            <Icon name="dropdown" />
            <ModuleTranslate
              fallback={
                (distinguishedUnitType && distinguishedUnitType.category) ||
                category
              }
              textKey={
                (distinguishedUnitType && distinguishedUnitType.category) ||
                category
              }
            />
            {distinguishedUnitType &&
              distinguishedUnitType.name && (
                <span style={{ fontWeight: 'normal' }}>
                  {` (${distinguishedUnitType.name})`}
                </span>
              )}
          </React.Fragment>
        ) : (
          <Icon name="dropdown" />
        )
      }
      right={
        lastCuratorialAssessment &&
        lastCuratorialAssessment.isInStorage !== undefined && (
          <Label
            color={lastCuratorialAssessment.isInStorage ? 'green' : 'red'}
            horizontal
          >
            {lastCuratorialAssessment.isInStorage ? 'In storage' : 'Not found'}
          </Label>
        )
      }
      rightColumnTextAlign="right"
    />
  )
}

PhysicalObjectTitle.propTypes = propTypes
PhysicalObjectTitle.defaultProps = defaultProps

export default compose(
  createGetDistinguishedUnitTypeById('distinguishedUnitTypeId'),
  createGetStorageLocationById('physicalUnit.storageLocation.id')
)(PhysicalObjectTitle)
