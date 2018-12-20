import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { Field, FieldTemplate, Input } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { FeatureObservationDropdownSearch } from 'domainModules/curatedList/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:FeatureObservations:FeatureObservationsTableRow'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const getPlaceholder = (group, key) => {
  let placeholderKey
  switch (group) {
    case 'bone-count': {
      break
    }
    case 'length': {
      placeholderKey = 'length'
      break
    }
    case 'weight': {
      placeholderKey = 'weight'
      break
    }
    default: {
      placeholderKey = key
      break
    }
  }
  return placeholderKey && `featureObservations.placeholders.${placeholderKey}`
}

const getColumnWidth = group => {
  switch (group) {
    case 'bone-count': {
      return 1
    }
    case 'carcass-condition': {
      return 7
    }
    case 'age-and-stage':
    case 'age-stage':
    case 'sex': {
      return 6
    }
    default: {
      return 4
    }
  }
}

const getLabelWidth = group => {
  switch (group) {
    case 'sex': {
      return 2
    }
    case 'carcass-condition': {
      return 3
    }
    case 'length': {
      return 5
    }
    default: {
      return 4
    }
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  featureType: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
}

class FeatureObservationTableRow extends PureComponent {
  componentWillMount() {
    const { changeFieldValue, getPath, featureType } = this.props
    changeFieldValue(getPath('featureType.id'), featureType.id)
  }

  render() {
    const {
      featureType,
      getPath,
      i18n: { moduleTranslate },
      index,
      module,
    } = this.props

    const {
      attributes: {
        group,
        key,
        selectableMethods,
        selectableUnits,
        selectableValues,
      },
    } = featureType

    const placeholderKey = getPlaceholder(group, key)

    const hasSelectableMethods = !!selectableMethods
    const hasSelectableUnits = !!selectableUnits
    const hasSelectableValues = !!selectableValues

    const moreThanTwoColumns = hasSelectableUnits || hasSelectableMethods

    const columnWidth = getColumnWidth(group)
    const labelWidth = getLabelWidth(group)
    log.render()
    return (
      <Table.Row key={index}>
        <Table.Cell key={getPath('featureType.id')} width={labelWidth}>
          <FieldTemplate
            label={
              <ModuleTranslate
                fallback={key}
                module={module}
                scope="featureObservations"
                textKey={`other.${key}`}
              />
            }
            module={module}
            name={`features.${key}`}
          />
        </Table.Cell>
        {hasSelectableValues ? (
          <Table.Cell
            key={getPath('featureObservationText')}
            width={columnWidth}
          >
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module={module}
              name={getPath('featureObservationText')}
              placeholder={
                placeholderKey &&
                moduleTranslate({
                  capitalize: true,
                  module,
                  textKey: placeholderKey,
                })
              }
              rawOptions={selectableValues}
              type="text"
            />
          </Table.Cell>
        ) : (
          <Table.Cell
            key={getPath('featureObservationText')}
            width={columnWidth}
          >
            <Field
              autoComplete="off"
              className="transparent"
              component={Input}
              displayLabel={false}
              fluid
              module={module}
              name={getPath('featureObservationText')}
              placeholder={
                placeholderKey &&
                moduleTranslate({
                  capitalize: true,
                  module,
                  textKey: placeholderKey,
                })
              }
              type="text"
            />
          </Table.Cell>
        )}

        {hasSelectableUnits && (
          <Table.Cell key={getPath('featureObservationUnit')} width={5}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module={module}
              name={getPath('featureObservationUnit')}
              placeholder={moduleTranslate({
                capitalize: true,
                module,
                textKey: 'featureObservations.placeholders.selectUnit',
              })}
              rawOptions={selectableUnits}
              type="text"
            />
          </Table.Cell>
        )}
        {hasSelectableMethods && (
          <Table.Cell key={getPath('methodText')} width={6}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              displayLabel={false}
              module={module}
              name={getPath('methodText')}
              placeholder={moduleTranslate({
                capitalize: true,
                module,
                textKey: 'featureObservations.placeholders.selectMethod',
              })}
              rawOptions={selectableMethods}
              type="text"
            />
          </Table.Cell>
        )}

        {!moreThanTwoColumns && <Table.Cell width={6} />}
        {hasSelectableUnits && <Table.Cell width={4} />}
      </Table.Row>
    )
  }
}

FeatureObservationTableRow.propTypes = propTypes

export default compose(withI18n(), pathBuilder())(FeatureObservationTableRow)
