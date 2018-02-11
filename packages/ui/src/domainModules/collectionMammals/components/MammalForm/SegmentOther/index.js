import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'catalogedUnit',
})

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

const SegmentOther = ({ getPath }) => {
  return (
    <Segment color="green">
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={Input}
            disabled
            label={<ModuleTranslate textKey="remarks" />}
            module="collectionMammals"
            name={getPath('remarks')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentOther.propTypes = propTypes

export default pathBuilder({ name: 'physicalUnits.0.catalogedUnit' })(
  SegmentOther
)
