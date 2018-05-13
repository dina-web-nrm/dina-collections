import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { ThreeColumnGrid } from 'coreModules/commonUi/components'
import { Icon, Label } from 'semantic-ui-react'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
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
  storageLocation: PropTypes.object,
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
        storageLocation &&
        storageLocation.attributes && (
          <span style={{ fontWeight: 'normal' }}>
            {storageLocation.attributes.name}
          </span>
        )
      }
      left={
        preparationType || category ? (
          <React.Fragment>
            <Icon name="dropdown" />
            <ModuleTranslate
              fallback={
                (preparationType &&
                  preparationType.attributes &&
                  preparationType.attributes.category) ||
                category
              }
              textKey={
                (preparationType &&
                  preparationType.attributes &&
                  preparationType.attributes.category) ||
                category
              }
            />
            {preparationType &&
              preparationType.attributes &&
              preparationType.attributes.name && (
                <span style={{ fontWeight: 'normal' }}>
                  {` (${preparationType.attributes.name})`}
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
  createGetItemById({
    idPath: 'preparationTypeId',
    itemKey: 'preparationType',
    relationships: null,
    resource: 'preparationType',
  }),
  createGetItemById({
    idPath: 'physicalObject.storageLocation.id',
    itemKey: 'storageLocation',
    relationships: null,
    resource: 'storageLocation',
  })
)(PhysicalObjectTitle)
