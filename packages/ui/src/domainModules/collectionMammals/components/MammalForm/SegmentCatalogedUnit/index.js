import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import CatalogNumberInput from '../CatalogNumberInput'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'catalogedUnit',
})

const propTypes = {
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
}

const SegmentCatalogedUnit = ({ editMode, formValueSelector, getPath }) => {
  return (
    <Segment color="green">
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={CatalogNumberInput}
            editMode={editMode}
            formValueSelector={formValueSelector}
            helpText={<ModuleTranslate textKey="sixOrEightDigits" />}
            label={<ModuleTranslate textKey="catalogNumber" />}
            module="collectionMammals"
            name={getPath('catalogNumber')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={6} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            disabled
            label={<ModuleTranslate textKey="storedUnderTaxonName" />}
            module="collectionMammals"
            name={getPath('storedUnderTaxonName')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={16}>
          <Field
            autoComplete="off"
            component={Checkbox}
            label={<ModuleTranslate textKey="isPublic" />}
            module="collectionMammals"
            name={getPath('publishRecord')}
            type="checkbox"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentCatalogedUnit.propTypes = propTypes

export default pathBuilder({ name: 'physicalUnits.0.catalogedUnit' })(
  SegmentCatalogedUnit
)
