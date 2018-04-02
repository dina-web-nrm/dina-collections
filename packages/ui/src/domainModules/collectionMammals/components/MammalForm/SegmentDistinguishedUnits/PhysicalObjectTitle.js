import React from 'react'
import PropTypes from 'prop-types'

import { ThreeColumnGrid } from 'coreModules/commonUi/components'
import { Icon, Label } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { createGetStorageLocationById } from 'domainModules/storageService/higherOrderComponents'
import createLog from 'utilities/log'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'distinguishedUnits',
})

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectTitle'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  curatorialAssessments: PropTypes.array,
  distinguishedUnitType: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
  }),
  storageLocation: PropTypes.shape({ name: PropTypes.string.isRequired }),
}
const defaultProps = {
  curatorialAssessments: undefined,
  distinguishedUnitType: undefined,
  storageLocation: undefined,
}

function PhysicalObjectTitle({
  active,
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
        distinguishedUnitType ? (
          <React.Fragment>
            <Icon name="dropdown" />
            <ModuleTranslate
              fallback={distinguishedUnitType.category}
              textKey={distinguishedUnitType.category}
            />
            {distinguishedUnitType.name && (
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
    />
  )
}

PhysicalObjectTitle.propTypes = propTypes
PhysicalObjectTitle.defaultProps = defaultProps

export default createGetStorageLocationById('physicalUnit.storageLocation.id')(
  PhysicalObjectTitle
)
