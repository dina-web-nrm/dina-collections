import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.locationInformation.${textKey}`

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

function Position({ getPath, i18n: { moduleTranslate } }) {
  return (
    <Grid.Row>
      <Grid.Column mobile={16}>
        <Header size="small">Coordinate (interpreted)</Header>
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('latitude'),
            descriptionKey: buildModuleTextKey('helpTexts.latitude'),
          }}
          label={moduleTranslate({ textKey: 'latitude' })}
          module="collectionMammals"
          name={getPath('latitude')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('longitude'),
            descriptionKey: buildModuleTextKey('helpTexts.longitude'),
          }}
          label={moduleTranslate({ textKey: 'longitude' })}
          module="collectionMammals"
          name={getPath('longitude')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          label="Ref. syst"
          module="collectionMammals"
          name={getPath('referenceSystem')}
          type="text"
        />
      </Grid.Column>
    </Grid.Row>
  )
}

Position.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'collectingInformation.locationInformation.position',
  }),
  pathBuilder({ name: 'position' })
)(Position)
