import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { Field } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { AdvancedLocalityDropdownSearch } from 'domainModules/locality/components'
import { ALL, CONTINENT } from 'domainModules/locality/constants'

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

function LocationInformationFields({ getPath, i18n: { moduleTranslate } }) {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={6} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={AdvancedLocalityDropdownSearch}
            group={ALL}
            initialText={moduleTranslate({ textKey: 'other.choose' })}
            module="collectionMammals"
            name={getPath('0.id')}
            parameterKey="places.higherGeography"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={AdvancedLocalityDropdownSearch}
            group={CONTINENT}
            initialText={moduleTranslate({ textKey: 'other.choose' })}
            module="collectionMammals"
            name={getPath('1.id')}
            parameterKey="places.swedishMap"
          />
        </Grid.Column>
      </Grid.Row>
    </React.Fragment>
  )
}

LocationInformationFields.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
  }),
  pathBuilder({ name: 'places' })
)(LocationInformationFields)
