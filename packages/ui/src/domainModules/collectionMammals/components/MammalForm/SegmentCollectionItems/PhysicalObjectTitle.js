import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { ThreeColumnGrid } from 'coreModules/commonUi/components'
import { Icon, Label } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { createGetPreparationTypeById } from 'dataModules/curatedListService/higherOrderComponents'
import { createGetStorageLocationById } from 'dataModules/storageService/higherOrderComponents'
import createLog from 'utilities/log'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'collectionItems',
})

const log = createLog(
  'modules:collectionMammals:MammalForm:PhysicalObjectTitle'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  category: PropTypes.string,
  curatorialAssessments: PropTypes.array,
  preparationType: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
  }),
  storageLocation: PropTypes.shape({ name: PropTypes.string.isRequired }),
}
const defaultProps = {
  category: undefined,
  curatorialAssessments: undefined,
  preparationType: undefined,
  storageLocation: undefined,
}

function PhysicalObjectTitle({
  active,
  category,
  curatorialAssessments,
  preparationType,
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
        preparationType || category ? (
          <React.Fragment>
            <Icon name="dropdown" />
            <ModuleTranslate
              fallback={
                (preparationType && preparationType.category) || category
              }
              textKey={
                (preparationType && preparationType.category) || category
              }
            />
            {preparationType &&
              preparationType.name && (
                <span style={{ fontWeight: 'normal' }}>
                  {` (${preparationType.name})`}
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
  createGetPreparationTypeById('preparationTypeId'),
  createGetStorageLocationById('physicalUnit.storageLocation.id')
)(PhysicalObjectTitle)
