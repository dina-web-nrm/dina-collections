import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { touch } from 'redux-form'
import { Grid } from 'semantic-ui-react'
import { camelCase } from 'lodash'

import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'
import {
  ConfirmationPopup,
  DropdownSearch,
  Field,
  Remarks,
} from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { StorageLocationDropdownPickerSearch } from 'domainModules/storage/components'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import curatedListSelectors from 'domainModules/curatedList/globalSelectors'
import { ALL } from 'domainModules/storage/constants'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import CuratorialAssessmentsList from './CuratorialAssessmentsList'

const log = createLog(
  'modules:collectionMammals:formParts:PhysicalObjectContent'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { category, preparationType }) => {
  // TODO use selector for preparationType options
  return {
    preparationTypeOptions: curatedListSelectors.getPreparationTypeOptions(
      state,
      (preparationType && preparationType.category) || category || 'undefined'
    ),
  }
}
const mapDispatchToProps = { touch }

const propTypes = {
  category: PropTypes.string.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  curatorialAssessments: PropTypes.array,
  formName: PropTypes.string.isRequired,
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  preparationTypeOptions: PropTypes.array,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired,
}
const defaultProps = {
  curatorialAssessments: undefined,
  preparationTypeOptions: [],
}

class PhysicalObjectContent extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentWillUnmount() {
    // trigger validation even if the field has not been touched, because it is
    // easy to miss (hard to find) this otherwise
    this.props.touch(
      this.props.formName,
      this.props.getPath('physicalObject.storageLocation.id')
    )
  }

  handleRemove() {
    const {
      getTranslationPath,
      handleSetInactive,
      index,
      removeArrayFieldByIndex,
    } = this.props

    handleSetInactive(index)
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const {
      category,
      changeFieldValue,
      curatorialAssessments,
      preparationTypeOptions,
      getPath,
      removeArrayFieldByIndex,
    } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row className="relaxed">
          <Grid.Column width={9}>
            <Field
              autoComplete="off"
              component={DropdownSearch}
              disableClearValue
              module="collectionMammals"
              name={getPath('preparationType.id')}
              options={preparationTypeOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Field
              autoComplete="off"
              component={StorageLocationDropdownPickerSearch}
              group={ALL}
              module="collectionMammals"
              name={getPath('physicalObject.storageLocation.id')}
              showParentName
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <CuratorialAssessmentsList
              changeFieldValue={changeFieldValue}
              curatorialAssessments={curatorialAssessments}
              removeArrayFieldByIndex={removeArrayFieldByIndex}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={Remarks}
              emptyStateTextKey="remarks.emptyState.physicalObject"
              model="specimen"
              module="collectionMammals"
              name={getPath('description')}
              showParentName
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={16}>
            <ConfirmationPopup
              cancelButtonText={<ModuleTranslate textKey="other.cancel" />}
              confirmButtonText={<ModuleTranslate textKey="other.remove" />}
              header={
                <ModuleTranslate
                  textKey={`other.physicalObjects.remove${capitalizeFirstLetter(
                    camelCase(category)
                  )}`}
                />
              }
              hideOnScroll
              onConfirm={this.handleRemove}
              text={<ModuleTranslate textKey="other.remove" />}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

PhysicalObjectContent.propTypes = propTypes
PhysicalObjectContent.defaultProps = defaultProps

export default compose(
  createGetItemById({
    idPath: 'preparationTypeId',
    relationships: null,
    resource: 'preparationType',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder()
)(PhysicalObjectContent)
