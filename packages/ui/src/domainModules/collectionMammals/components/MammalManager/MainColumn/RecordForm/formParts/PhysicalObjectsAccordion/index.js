import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import objectPath from 'object-path'
import { camelCase } from 'lodash'

import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { ALL_COLLAPSED } from 'coreModules/commonUi/constants'
import { globalSelectors as crudKeyObjectSelectors } from 'coreModules/crud/keyObjectModule'
import {
  UNSPECIFIED_OTHER_PREPARATION_PREPARATION_TYPE_ID,
  UNSPECIFIED_SKELETON_PREPARATION_TYPE_ID,
  UNSPECIFIED_SKIN_PREPARATION_TYPE_ID,
  UNSPECIFIED_WET_PREPARATION_PREPARATION_TYPE_ID,
} from 'domainModules/curatedList/constants'
import formParts from 'coreModules/form/components/parts'
import crudActionCreators from 'coreModules/crud/actionCreators'
import crudSelectors from 'coreModules/crud/globalSelectors'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import PhysicalObjectContent from './PhysicalObjectContent'
import PhysicalObjectTitle from './PhysicalObjectTitle'

const { AddButton } = formParts

const log = createLog(
  'modules:collectionMammals:formParts:PhysicalObjectsAccordion'
)

const categoryUnspecifiedTypeIdMap = {
  'other-preparation': UNSPECIFIED_OTHER_PREPARATION_PREPARATION_TYPE_ID,
  skeleton: UNSPECIFIED_SKELETON_PREPARATION_TYPE_ID,
  skin: UNSPECIFIED_SKIN_PREPARATION_TYPE_ID,
  'wet-preparation': UNSPECIFIED_WET_PREPARATION_PREPARATION_TYPE_ID,
}

const getMatchesCategory = ({
  category,
  preparationType,
  preparationTypes,
}) => {
  if (
    preparationType &&
    preparationType.category &&
    preparationType.category === category
  ) {
    return true
  }

  if (preparationType && preparationType.id) {
    const resource = preparationTypes[preparationType.id]
    if (resource) {
      return objectPath.get(resource, 'attributes.category') === category
    }
  }

  return false
}

const getShouldExpandFirstItemOnMount = (item = {}) => {
  return Object.keys(item).length === 1
}

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    allPreparationTypesFetched: crudKeyObjectSelectors.get[
      ':resource.allItemsFetched'
    ](state, { resource: 'preparationType' }),
    collectionItems: formValueSelector(state, name),
    preparationTypes: crudSelectors.preparationType.getItemsObject(state),
  }
}
const mapDispatchToProps = {
  getStorageLocations: crudActionCreators.storageLocation.getMany,
}

const propTypes = {
  allPreparationTypesFetched: PropTypes.bool.isRequired,
  category: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  collectionItems: PropTypes.array,
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getStorageLocations: PropTypes.func.isRequired,
  preparationTypes: PropTypes.object,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  collectionItems: [],
  preparationTypes: {},
}

class PhysicalObjectsAccordion extends PureComponent {
  constructor(props) {
    super(props)
    this.getShouldRenderAccordion = this.getShouldRenderAccordion.bind(this)
    this.getShouldRenderItem = this.getShouldRenderItem.bind(this)
  }

  getShouldRenderItem({ preparationType }) {
    const { category, preparationTypes } = this.props
    return getMatchesCategory({ category, preparationType, preparationTypes })
  }

  getShouldRenderAccordion() {
    const { category, collectionItems, preparationTypes } = this.props

    for (let index = 0; index < collectionItems.length; index += 1) {
      const { preparationType } = collectionItems[index]
      if (
        this.getShouldRenderItem({
          category,
          preparationType,
          preparationTypes,
        })
      ) {
        return true
      }
    }

    return false
  }

  render() {
    log.render()
    const {
      allPreparationTypesFetched,
      category,
      changeFieldValue,
      collectionItems,
      formName,
      formValueSelector,
      removeArrayFieldByIndex,
    } = this.props

    if (!allPreparationTypesFetched) {
      return null
    }

    return (
      <React.Fragment>
        {this.getShouldRenderAccordion() &&
          collectionItems.length > 0 && (
            <Grid.Column computer={16}>
              <Accordion
                expandItemOnAdd
                getShouldExpandFirstItemOnMount={
                  getShouldExpandFirstItemOnMount
                }
                getShouldRenderItem={this.getShouldRenderItem}
                initialActiveMode={ALL_COLLAPSED}
                items={collectionItems}
                renderActiveOnly
                renderContent={props => {
                  return (
                    <PhysicalObjectContent
                      category={category}
                      changeFieldValue={changeFieldValue}
                      formName={formName}
                      formValueSelector={formValueSelector}
                      preparationTypeId={
                        props.preparationType && props.preparationType.id
                      }
                      removeArrayFieldByIndex={removeArrayFieldByIndex}
                      {...props}
                    />
                  )
                }}
                renderTitle={props => {
                  return (
                    <PhysicalObjectTitle
                      category={category}
                      formName={formName}
                      preparationTypeId={
                        props.preparationType && props.preparationType.id
                      }
                      {...props}
                    />
                  )
                }}
              />
            </Grid.Column>
          )}
        <Grid.Column width={16}>
          <AddButton
            module="collectionMammals"
            onClick={event => {
              event.preventDefault()
              changeFieldValue(
                `individual.collectionItems.${collectionItems.length}`,
                {
                  preparationType: {
                    id: categoryUnspecifiedTypeIdMap[category],
                  },
                }
              )
            }}
            textKey={`other.physicalObjects.add${capitalizeFirstLetter(
              camelCase(category)
            )}`}
          />
        </Grid.Column>
      </React.Fragment>
    )
  }
}

PhysicalObjectsAccordion.propTypes = propTypes
PhysicalObjectsAccordion.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder({
    name: 'individual.collectionItems',
  })
)(PhysicalObjectsAccordion)
