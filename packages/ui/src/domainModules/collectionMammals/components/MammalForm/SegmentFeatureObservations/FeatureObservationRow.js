import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import FeatureTypeNameDropdown from '../../FeatureTypeNameDropdown'

const propTypes = {
  featureObservationTypes: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

function FeatureObservationRow({
  featureObservationTypes,
  getPath,
  index,
  i18n: { moduleTranslate },
}) {
  return (
    <Table.Row key={index}>
      <Table.Cell
        key={getPath('featureObservationType.featureObservationTypeName')}
      >
        <Field
          autoComplete="off"
          className="transparent"
          component={FeatureTypeNameDropdown}
          format={id => {
            if (featureObservationTypes[id]) {
              const { key } = featureObservationTypes[id]
              return moduleTranslate({ fallback: key, textKey: key })
            }

            return ''
          }}
          module="collectionMammals"
          name={getPath('featureObservationType.id')}
          type="text"
        />
      </Table.Cell>
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
      <Table.Cell key={getPath('methodText')}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={getPath('methodText')}
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
      <Table.Cell key={getPath('featureObservationDate')}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={getPath('date')}
          type="text"
        />
      </Table.Cell>
    </Table.Row>
  )
}

FeatureObservationRow.propTypes = propTypes

export default pathBuilder()(FeatureObservationRow)
