import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

import {
  CONTINENTS,
  COUNTRIES,
  DISTRICTS,
  PROVINCES,
} from 'domainModules/collectionMammals/constants'
import globalSelectors from 'domainModules/collectionMammals/globalSelectors'
import LocalityDropdownSearch from 'domainModules/collectionMammals/components/LocalityDropdownSearch'
import updateLocalityInformationSearchQueryAC from 'domainModules/collectionMammals/actionCreators/updateLocalityInformationSearchQuery'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`

const mapDispatchToProps = {
  updateLocalityInformationSearchQuery: updateLocalityInformationSearchQueryAC,
}

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  updateLocalityInformationSearchQuery: PropTypes.func.isRequired,
}

function LocalityInformationFields({
  getPath,
  i18n: { moduleTranslate },
  updateLocalityInformationSearchQuery,
}) {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            options={CONTINENTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            options={COUNTRIES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            options={PROVINCES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            options={DISTRICTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
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
  connect(undefined, mapDispatchToProps),
  withI18n({
    module: 'collectionMammals',
    scope: 'occurrences.localityInformation.curatedLocalities',
  }),
  pathBuilder({ name: 'curatedLocalities' })
)(LocalityInformationFields)
