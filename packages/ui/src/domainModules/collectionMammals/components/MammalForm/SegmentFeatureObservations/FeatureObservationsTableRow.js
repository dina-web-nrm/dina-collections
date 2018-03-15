import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Field, Input } from 'coreModules/form/components'
import { ModuleTranslate } from 'coreModules/i18n/components'
import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import updateFeatureObservationSearchQueryAC from '../../../actionCreators/updateFeatureObservationSearchQuery'
import globalSelectors from '../../../globalSelectors'
import FeatureObservationDropdownSearch from '../../FeatureObservationDropdownSearch'

const log = createLog(
  'domainModules:collectionMammals:components:MammalForm:SegmentFeatureObservations:FeatureObservationsTable:FeatureObservationsTableRow'
)

const mapSelectablesToDropdownOptions = (
  selectables,
  { language, defaultLanguage } = {}
) => {
  return selectables.map(({ key, name }) => {
    if (typeof name === 'string') {
      return {
        key,
        text: name,
        value: key,
      }
    }

    const potentialBackendTranslation =
      (language || defaultLanguage) && (name[language] || name[defaultLanguage])

    return {
      key,
      text: potentialBackendTranslation || key,
      value: key,
    }
  })
}

const mapStateToProps = state => {
  return {
    defaultLanguage: i18nSelectors.getDefaultLanguage(state),
    language: i18nSelectors.getLanguage(state),
  }
}
const mapDispatchToProps = {
  updateFeatureObservationSearchQuery: updateFeatureObservationSearchQueryAC,
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
  feature: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  language: PropTypes.string,
  updateFeatureObservationSearchQuery: PropTypes.func.isRequired,
}
const defaultProps = {
  language: undefined,
}

class FeatureObservationTableRow extends Component {
  componentWillMount() {
    const { changeFieldValue, getPath, feature } = this.props
    changeFieldValue(getPath('featureObservationType.id'), feature.id)
  }

  render() {
    const {
      defaultLanguage,
      feature,
      getPath,
      index,
      language,
      updateFeatureObservationSearchQuery,
    } = this.props

    const {
      key,
      selectableMethods,
      selectableUnits,
      selectableValues,
    } = feature

    const hasSelectableMethods = !!selectableMethods
    const hasSelectableUnits = !!selectableUnits
    const hasSelectableValues = !!selectableValues

    // TODO: Move to selectors
    const selectableMethodOptions =
      hasSelectableMethods &&
      mapSelectablesToDropdownOptions(selectableMethods, {
        defaultLanguage,
        language,
      })
    const selectableUnitOptions =
      hasSelectableUnits &&
      mapSelectablesToDropdownOptions(selectableUnits, {
        defaultLanguage,
        language,
      })
    const selectableValueOptions =
      hasSelectableValues &&
      mapSelectablesToDropdownOptions(selectableValues, {
        defaultLanguage,
        language,
      })

    log.render()
    return (
      <Table.Row key={index}>
        <Table.Cell key={getPath('featureObservationType.id')}>
          <ModuleTranslate
            fallback={key}
            module="collectionMammals"
            scope="featureObservations"
            textKey={key}
          />
        </Table.Cell>
        {hasSelectableValues ? (
          <Table.Cell key={getPath('featureObservationText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              format={value => {
                const option = selectableValueOptions.find(
                  ({ value: optionValue }) => optionValue === value
                )
                return option && option.text
              }}
              getSearchQuery={globalSelectors.getFeatureObservationSearchQuery}
              module="collectionMammals"
              name={getPath('featureObservationText')}
              options={selectableValueOptions}
              type="text"
              updateSearchQuery={updateFeatureObservationSearchQuery}
            />
          </Table.Cell>
        ) : (
          <Table.Cell key={getPath('featureObservationText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              module="collectionMammals"
              name={getPath('featureObservationText')}
              type="text"
            />
          </Table.Cell>
        )}
        {hasSelectableUnits && (
          <Table.Cell key={getPath('featureObservationUnit')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              format={value => {
                const option = selectableUnitOptions.find(
                  ({ value: optionValue }) => optionValue === value
                )
                return option && option.text
              }}
              getSearchQuery={globalSelectors.getFeatureObservationSearchQuery}
              module="collectionMammals"
              name={getPath('featureObservationUnit')}
              options={selectableUnitOptions}
              type="text"
              updateSearchQuery={updateFeatureObservationSearchQuery}
            />
          </Table.Cell>
        )}
        {hasSelectableMethods && (
          <Table.Cell key={getPath('methodText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              format={value => {
                const option = selectableMethodOptions.find(
                  ({ value: optionValue }) => optionValue === value
                )
                return option && option.text
              }}
              getSearchQuery={globalSelectors.getFeatureObservationSearchQuery}
              module="collectionMammals"
              name={getPath('methodText')}
              options={selectableMethodOptions}
              type="text"
              updateSearchQuery={updateFeatureObservationSearchQuery}
            />
          </Table.Cell>
        )}
        <Table.Cell key={getPath('featureObservationDate')} width={1}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            module="collectionMammals"
            name={getPath('date')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell key={getPath('featureObservationAgent')}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            module="collectionMammals"
            name={getPath('featureObservationAgent')}
            type="text"
          />
        </Table.Cell>
        <Table.Cell key={getPath('remarks')}>
          <Field
            autoComplete="off"
            className="transparent"
            component={Input}
            module="collectionMammals"
            name={getPath('remarks')}
            type="text"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

FeatureObservationTableRow.propTypes = propTypes
FeatureObservationTableRow.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder()
)(FeatureObservationTableRow)
