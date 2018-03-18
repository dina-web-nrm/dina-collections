import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Field, Input } from 'coreModules/form/components'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import FeatureObservationDropdownSearch from '../../FeatureObservationDropdownSearch'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations:FeatureObservationsTableRow'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  featureObservationType: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
}

class FeatureObservationTableRow extends Component {
  componentWillMount() {
    const { changeFieldValue, getPath, featureObservationType } = this.props
    changeFieldValue(
      getPath('featureObservationType.id'),
      featureObservationType.id
    )
  }

  render() {
    const { featureObservationType, getPath, index } = this.props

    const {
      key,
      selectableMethods,
      selectableUnits,
      selectableValues,
    } = featureObservationType

    const hasSelectableMethods = !!selectableMethods
    const hasSelectableUnits = !!selectableUnits
    const hasSelectableValues = !!selectableValues

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
              module="collectionMammals"
              name={getPath('featureObservationText')}
              rawOptions={selectableValues}
              type="text"
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
              module="collectionMammals"
              name={getPath('featureObservationUnit')}
              rawOptions={selectableUnits}
              type="text"
            />
          </Table.Cell>
        )}
        {hasSelectableMethods && (
          <Table.Cell key={getPath('methodText')}>
            <Field
              autoComplete="off"
              className="transparent"
              component={FeatureObservationDropdownSearch}
              module="collectionMammals"
              name={getPath('methodText')}
              rawOptions={selectableMethods}
              type="text"
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

export default compose(pathBuilder())(FeatureObservationTableRow)
