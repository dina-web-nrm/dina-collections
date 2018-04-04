import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { Field } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import LocalityDropdownSearch from 'domainModules/locality/components/AdvancedLocalityDropdownSearch'
import { ALL, CONTINENT } from 'dataModules/localityService/constants'

import { MAMMAL_FORM_NAME as formName } from 'domainModules/collectionMammals/constants'

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
        <Grid.Column computer={6} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={ALL}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label="Higher geography"
            module="collectionMammals"
            name={getPath('0.id')}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={6} mobile={16} tablet={16}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            formName={formName}
            group={CONTINENT}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label="Swedish map"
            module="collectionMammals"
            name={getPath('1.id')}
          />
        </Grid.Column>
      </Grid.Row>
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
