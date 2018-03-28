import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import LocalityDropdownSearch from 'domainModules/locality/components/AdvancedLocalityDropdownSearch'
import {
  CONTINENT,
  COUNTRY,
  DISTRICT,
  PROVINCE,
} from 'domainModules/localityService/constants'

import { MAMMAL_FORM_NAME as formName } from 'domainModules/collectionMammals/constants'

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
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={CONTINENT}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('continentStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.continentStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'continentStandardized' })}
            module="collectionMammals"
            name={getPath('0.id')}
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={COUNTRY}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('countryStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.countryStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'countryStandardized' })}
            module="collectionMammals"
            name={getPath('1.id')}
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={PROVINCE}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('provinceStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.provinceStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'provinceStandardized' })}
            module="collectionMammals"
            name={getPath('2.id')}
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={DISTRICT}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('districtStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.districtStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'districtStandardized' })}
            module="collectionMammals"
            name={getPath('3.id')}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityStandardized'),
            descriptionKey: buildModuleTextKey(
              'helpTexts.localityStandardized'
            ),
          }}
          label={moduleTranslate({ textKey: 'localityStandardized' })}
          module="collectionMammals"
          name={getPath('4.id')}
          type="text"
        />
      </Grid.Column>
    </React.Fragment>
  )
}

LocalityInformationFields.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'individualCircumstances.localityInformation.curatedLocalities',
  }),
  pathBuilder({ name: 'curatedLocalities' })
)(LocalityInformationFields)
