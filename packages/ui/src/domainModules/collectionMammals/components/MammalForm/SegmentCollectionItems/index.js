import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Header, Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { FIRST_EXPANDED, ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { ensureAllStorageLocationsFetched } from 'dataModules/storageService/higherOrderComponents'
import { ensureAllPreparationTypesFetched } from 'dataModules/curatedListService/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { getStorageLocations } from 'dataModules/storageService/actionCreators'
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

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'collectionItems',
})

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    collectionItems: formValueSelector(state, 'collectionItems'),
  }
}
const mapDispatchToProps = { getStorageLocations }

const propTypes = {
  allPreparationTypesFetched: PropTypes.bool.isRequired,
  allStorageLocationsFetched: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  collectionItems: PropTypes.array,
  editMode: PropTypes.bool.isRequired,
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
      removeArrayFieldByIndex,
    } = this.props
    log.render()
    return (
      <Segment
        color="green"
        loading={!(allStorageLocationsFetched && allPreparationTypesFetched)}
      >
        <Header size="medium">
          <ModuleTranslate textKey="physicalObjects" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {collectionItems &&
            collectionItems.length > 0 && (
              <Grid.Column computer={16}>
                <Accordion
                  initialActiveMode={editMode ? ALL_COLLAPSED : FIRST_EXPANDED}
                  items={collectionItems}
                  renderContent={props => {
                    return (
                      <PhysicalObjectContent
                        category={
                          props.preparationType &&
                          props.preparationType.category
                        }
                        changeFieldValue={changeFieldValue}
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
                    `collectionItems.${collectionItems.length}`,
                    { preparationType: { category: SKELETON } }
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
                    `collectionItems.${collectionItems.length}`,
                    { preparationType: { category: SKIN } }
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
                    `collectionItems.${collectionItems.length}`,
                    { preparationType: { category: WET_PREPARATION } }
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

SegmentCollectionItems.propTypes = propTypes
SegmentCollectionItems.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  ensureAllPreparationTypesFetched(),
  ensureAllStorageLocationsFetched(),
  pathBuilder({
    name: 'collectionItems',
  })
)(SegmentCollectionItems)
