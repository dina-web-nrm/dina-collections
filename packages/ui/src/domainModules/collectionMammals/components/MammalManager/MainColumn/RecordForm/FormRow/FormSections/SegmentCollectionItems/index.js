import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Header, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { FIRST_EXPANDED, ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import crudActionCreators from 'coreModules/crud/actionCreators'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import {
  SKELETON,
  SKIN,
  WET_PREPARATION,
} from 'domainModules/curatedList/constants'
import PhysicalObjectContent from './PhysicalObjectContent'
import PhysicalObjectTitle from './PhysicalObjectTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentCollectionItems'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    collectionItems: formValueSelector(state, 'individual.collectionItems'),
  }
}
const mapDispatchToProps = {
  getStorageLocations: crudActionCreators.storageLocation.getMany,
}

const propTypes = {
  allPreparationTypesFetched: PropTypes.bool.isRequired,
  allStorageLocationsFetched: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  collectionItems: PropTypes.array,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getStorageLocations: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  collectionItems: [],
}

class SegmentCollectionItems extends PureComponent {
  render() {
    const {
      allPreparationTypesFetched,
      allStorageLocationsFetched,
      changeFieldValue,
      collectionItems,
      editMode,
      formValueSelector,
      removeArrayFieldByIndex,
    } = this.props
    log.render()
    return (
      <Segment
        color="green"
        loading={!(allStorageLocationsFetched && allPreparationTypesFetched)}
      >
        <Header size="medium">
          <ModuleTranslate capitalize textKey="headers.physicalObjects" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {collectionItems && collectionItems.length > 0 && (
            <Grid.Column computer={16}>
              <Accordion
                initialActiveMode={editMode ? ALL_COLLAPSED : FIRST_EXPANDED}
                items={collectionItems}
                renderContent={props => {
                  return (
                    <PhysicalObjectContent
                      category={
                        props.preparationType && props.preparationType.category
                      }
                      changeFieldValue={changeFieldValue}
                      formValueSelector={formValueSelector}
                      preparationTypeId={
                        props.preparationType && props.preparationType.id
                      }
                      removeArrayFieldByIndex={removeArrayFieldByIndex}
                      {...props}
                    />
                  )
                }}
                renderTitle={props => (
                  <PhysicalObjectTitle
                    category={
                      props.preparationType && props.preparationType.category
                    }
                    preparationTypeId={
                      props.preparationType && props.preparationType.id
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
                    `individual.collectionItems.${collectionItems.length}`,
                    { preparationType: { category: SKELETON } }
                  )
                }}
              >
                <ModuleTranslate textKey="other.newSkeleton" />
              </Button>
              <Button
                id="new-skin"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(
                    `individual.collectionItems.${collectionItems.length}`,
                    { preparationType: { category: SKIN } }
                  )
                }}
              >
                <ModuleTranslate textKey="other.newSkin" />
              </Button>
              <Button
                id="new-wet-preparation"
                onClick={event => {
                  event.preventDefault()
                  changeFieldValue(
                    `individual.collectionItems.${collectionItems.length}`,
                    { preparationType: { category: WET_PREPARATION } }
                  )
                }}
              >
                <ModuleTranslate textKey="other.newWetPreparation" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentCollectionItems.propTypes = propTypes
SegmentCollectionItems.defaultProps = defaultProps

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'allStorageLocationsFetched',
    resource: 'storageLocation',
  }),
  createEnsureAllItemsFetched({
    allItemsFetchedKey: 'allPreparationTypesFetched',
    resource: 'preparationType',
  }),
  pathBuilder({
    name: 'individual.collectionItems',
  })
)(SegmentCollectionItems)
