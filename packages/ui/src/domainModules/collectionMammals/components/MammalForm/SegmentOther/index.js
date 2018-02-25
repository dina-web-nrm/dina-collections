import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const SegmentOther = () => {
  return (
    <Segment color="green">
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={6} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            disabled
            label={
              <ModuleTranslate
                scope="distinguishedUnits"
                textKey="storedUnderTaxonName"
              />
            }
            module="collectionMammals"
            name="distinguishedUnits.0.physicalUnit.storedUnderTaxonName"
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default SegmentOther
