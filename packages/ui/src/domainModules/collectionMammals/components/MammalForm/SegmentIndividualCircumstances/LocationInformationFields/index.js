import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'

import CuratedLocalities from './CuratedLocalities'
import Position from './Position'
import VerticalPosition from './VerticalPosition'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.locationInformation.${textKey}`

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

function LocationInformationFields({ getPath, i18n: { moduleTranslate } }) {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <FieldWrapper
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('localityVerbatim'),
              descriptionKey: buildModuleTextKey('helpTexts.localityVerbatim'),
            }}
            label={moduleTranslate({ textKey: 'localityVerbatim' })}
            module="collectionMammals"
            name={getPath('localityVerbatim')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label="Locality name (normalized)"
            module="collectionMammals"
            name={getPath('localityName')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <VerticalPosition />
      <Position />

      <Grid.Column computer={8} mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityRemarks'),
            descriptionKey: buildModuleTextKey('helpTexts.localityRemarks'),
          }}
          label={moduleTranslate({ textKey: 'localityRemarks' })}
          module="collectionMammals"
          name={getPath('remarks')}
          type="text"
        />
      </Grid.Column>
      <CuratedLocalities />
    </Grid>
  )
}

LocationInformationFields.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'individualCircumstances.locationInformation',
  }),
  pathBuilder({ name: 'event.locationInformation' })
)(LocationInformationFields)
