import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

import globalSelectors from 'domainModules/collectionMammals/globalSelectors'
import LocalityDropdownSearch from 'domainModules/collectionMammals/components/LocalityDropdownSearch'
import updateLocalityInformationSearchQueryAC from 'domainModules/collectionMammals/actionCreators/updateLocalityInformationSearchQuery'
import localitySelectors from 'domainModules/localityService/globalSelectors'
import {
  CONTINENT,
  COUNTRY,
  DISTRICT,
  PROVINCE,
} from 'domainModules/localityService/constants'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`

const mapStateToProps = state => {
  return {
    curatedLocalities: localitySelectors.getCuratedLocalities(state),
  }
}
const mapDispatchToProps = {
  updateLocalityInformationSearchQuery: updateLocalityInformationSearchQueryAC,
}

const propTypes = {
  curatedLocalities: PropTypes.object.isRequired,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  updateLocalityInformationSearchQuery: PropTypes.func.isRequired,
}

function LocalityInformationFields({
  curatedLocalities,
  getPath,
  i18n: { moduleTranslate },
  updateLocalityInformationSearchQuery,
}) {
  const formatLocalityName = id => {
    return curatedLocalities[id]
      ? capitalizeFirstLetter(curatedLocalities[id].name)
      : ''
  }

  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            format={formatLocalityName}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            format={formatLocalityName}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            format={formatLocalityName}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            format={formatLocalityName}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
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
  connect(mapStateToProps, mapDispatchToProps),
  withI18n({
    module: 'collectionMammals',
    scope: 'individualCircumstances.localityInformation.curatedLocalities',
  }),
  pathBuilder({ name: 'curatedLocalities' })
)(LocalityInformationFields)
