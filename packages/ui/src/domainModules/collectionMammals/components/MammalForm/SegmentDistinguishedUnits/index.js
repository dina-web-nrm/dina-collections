import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Header, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { FIRST_EXPANDED, ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { ensureAllStorageLocationsFetched } from 'domainModules/storageService/higherOrderComponents'
import { ensureAllDistinguishedUnitTypesFetched } from 'domainModules/curatedListService/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { getStorageLocations } from 'domainModules/storageService/actionCreators'
import {
  SKELETON,
  SKIN,
  WET_PREPARATION,
} from 'domainModules/curatedList/constants'
import PhysicalObjectContent from './PhysicalObjectContent'
import PhysicalObjectTitle from './PhysicalObjectTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDistinguishedUnits'
)

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'distinguishedUnits',
})

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    distinguishedUnits: formValueSelector(state, 'distinguishedUnits'),
  }
}
const mapDispatchToProps = { getStorageLocations }

const propTypes = {
  allDistinguishedUnitTypesFetched: PropTypes.bool.isRequired,
  allStorageLocationsFetched: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  distinguishedUnits: PropTypes.array,
  editMode: PropTypes.bool.isRequired,
  getStorageLocations: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  distinguishedUnits: [],
}

class SegmentDistinguishedUnits extends PureComponent {
  render() {
    const {
      allDistinguishedUnitTypesFetched,
      allStorageLocationsFetched,
      changeFieldValue,
      distinguishedUnits,
      editMode,
      removeArrayFieldByIndex,
    } = this.props
    log.render()
    return (
      <Segment
        color="green"
        loading={
          !(allStorageLocationsFetched && allDistinguishedUnitTypesFetched)
        }
      >
        <Header size="medium">
          <ModuleTranslate textKey="physicalObjects" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {distinguishedUnits &&
            distinguishedUnits.length > 0 && (
              <Grid.Column computer={16}>
                <Accordion
                  initialActiveMode={editMode ? ALL_COLLAPSED : FIRST_EXPANDED}
                  items={distinguishedUnits}
                  renderContent={props => {
                    return (
                      <PhysicalObjectContent
                        category={
                          props.distinguishedUnitType &&
                          props.distinguishedUnitType.category
                        }
                        changeFieldValue={changeFieldValue}
                        distinguishedUnitTypeId={
                          props.distinguishedUnitType &&
                          props.distinguishedUnitType.id
                        }
                        removeArrayFieldByIndex={removeArrayFieldByIndex}
                        {...props}
                      />
                    )
                  }}
                  renderTitle={props => (
                    <PhysicalObjectTitle
                      category={
                        props.distinguishedUnitType &&
                        props.distinguishedUnitType.category
                      }
                      distinguishedUnitTypeId={
                        props.distinguishedUnitType &&
                        props.distinguishedUnitType.id
                      }
                      {...props}
                    />
                  )}
                />
              </Grid.Column>
            )}
          <Grid.Column width={16}>
            <Button.Group>
              <Button
                id="new-skeleton"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(
                    `distinguishedUnits.${distinguishedUnits.length}`,
                    { distinguishedUnitType: { category: SKELETON } }
                  )
                }}
              >
                <ModuleTranslate textKey="newSkeleton" />
              </Button>
              <Button
                id="new-skin"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(
                    `distinguishedUnits.${distinguishedUnits.length}`,
                    { distinguishedUnitType: { category: SKIN } }
                  )
                }}
              >
                <ModuleTranslate textKey="newSkin" />
              </Button>
              <Button
                id="new-wet-preparation"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(
                    `distinguishedUnits.${distinguishedUnits.length}`,
                    { distinguishedUnitType: { category: WET_PREPARATION } }
                  )
                }}
              >
                <ModuleTranslate textKey="newWetPreparation" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentDistinguishedUnits.propTypes = propTypes
SegmentDistinguishedUnits.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ensureAllDistinguishedUnitTypesFetched(),
  ensureAllStorageLocationsFetched(),
  pathBuilder({
    name: 'distinguishedUnits',
  })
)(SegmentDistinguishedUnits)
