import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Icon, Label } from 'semantic-ui-react'

import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'
import { ThreeColumnGrid } from 'coreModules/commonUi/components'
import {
  createGetItemById,
  createGetNestedItemById,
} from 'coreModules/crud/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import createLog from 'utilities/log'

import { extractNameWithFirstLevelParent } from 'domainModules/storage/utilities'

const log = createLog('modules:collectionMammals:formParts:PhysicalObjectTitle')

const mapStateToProps = (state, { formName, getPath }) => {
  return {
    invalidStorageLocation: formSupportSelectors.getAnyFieldIsInvalid(state, {
      fieldNames: [getPath('physicalObject.storageLocation.id')],
      formName,
    }),
  }
}

const propTypes = {
  active: PropTypes.bool.isRequired,
  category: PropTypes.string,
  curatorialAssessments: PropTypes.array,
  invalidStorageLocation: PropTypes.bool,
  preparationType: PropTypes.shape({
    category: PropTypes.string,
    name: PropTypes.string,
  }),
  storageLocation: PropTypes.object,
}
const defaultProps = {
  category: undefined,
  curatorialAssessments: undefined,
  invalidStorageLocation: false,
  preparationType: undefined,
  storageLocation: undefined,
}

function PhysicalObjectTitle({
  active,
  category,
  curatorialAssessments,
  invalidStorageLocation,
  preparationType,
  storageLocation,
}) {
  log.render()

  if (active) {
    return (
      <ThreeColumnGrid
        className={invalidStorageLocation ? 'error' : undefined}
        left={<Icon name="dropdown" />}
      />
    )
  }

  const lastCuratorialAssessment =
    curatorialAssessments &&
    curatorialAssessments.length &&
    curatorialAssessments[curatorialAssessments.length - 1]

  return (
    <ThreeColumnGrid
      center={
        storageLocation && (
          <span style={{ fontWeight: 'normal' }}>
            {extractNameWithFirstLevelParent(storageLocation)}
          </span>
        )
      }
      classNames={invalidStorageLocation ? 'error' : undefined}
      left={
        preparationType || category ? (
          <React.Fragment>
            <Icon name="dropdown" />
            {preparationType &&
              preparationType.attributes &&
              preparationType.attributes.name &&
              preparationType.attributes.name.en && (
                <span style={{ fontWeight: 'normal' }}>
                  {capitalizeFirstLetter(preparationType.attributes.name.en)}
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
            {lastCuratorialAssessment.isInStorage
              ? 'In storage'
              : 'Not in storage'}
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
  createGetNestedItemById({
    idPath: 'physicalObject.storageLocation.id',
    include: ['parent.parent.parent.parent.parent'],
    nestedItemKey: 'storageLocation',
    relationships: [
      'parent',
      'parent.parent',
      'parent.parent.parent',
      'parent.parent.parent.parent',
      'parent.parent.parent.parent.parent',
    ],
    resolveRelationships: ['storageLocation'],
    resource: 'storageLocation',
  }),
  pathBuilder(),
  connect(mapStateToProps)
)(PhysicalObjectTitle)
