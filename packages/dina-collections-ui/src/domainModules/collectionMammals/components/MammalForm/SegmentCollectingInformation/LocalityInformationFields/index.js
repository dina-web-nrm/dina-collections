import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

import CuratedLocalities from './CuratedLocalities'
import Position from './Position'
import VerticalPosition from './VerticalPosition'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
}

function LocalityInformationFields({ getPath, i18n: { moduleTranslate } }) {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Column mobile={16}>
        <Field
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
      <CuratedLocalities />
      <Grid.Column computer={8} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('coordinatesVerbatim'),
            descriptionKey: buildModuleTextKey('helpTexts.coordinatesVerbatim'),
          }}
          label={moduleTranslate({ textKey: 'coordinatesVerbatim' })}
          module="collectionMammals"
          name={getPath('coordinatesVerbatim')}
          type="text"
        />
      </Grid.Column>
      <Position />
      <Grid.Column computer={12} mobile={16} tablet={12}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('georeferenceSourcesText'),
            descriptionKey: buildModuleTextKey(
              'helpTexts.georeferenceSourcesText'
            ),
          }}
          label={moduleTranslate({ textKey: 'georeferenceSourcesText' })}
          module="collectionMammals"
          name={getPath('georeferenceSourcesText')}
          type="text"
        />
      </Grid.Column>
      <VerticalPosition />
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityRemarks'),
            descriptionKey: buildModuleTextKey('helpTexts.localityRemarks'),
          }}
          label={moduleTranslate({ textKey: 'localityRemarks' })}
          module="collectionMammals"
          name={getPath('localityRemarks')}
          type="text"
        />
      </Grid.Column>
    </Grid>
  )
}

LocalityInformationFields.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'occurrences.localityInformation',
  }),
  pathBuilder({ name: 'localityInformation' })
)(LocalityInformationFields)
