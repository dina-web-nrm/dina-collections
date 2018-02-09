import React from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'physicalUnit',
})

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

const SegmentPhysicalUnits = ({ getPath }) => {
  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate textKey="physicalObjects" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="physicalUnitText"
              />
            }
            module="collectionMammals"
            name={getPath('physicalUnitText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="normalStorageLocationText"
              />
            }
            module="collectionMammals"
            name={getPath('normalStorageLocationText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="alternateIdentifiersText"
              />
            }
            module="collectionMammals"
            name={getPath('alternateIdentifiersText')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentPhysicalUnits.propTypes = propTypes

export default pathBuilder({
  name: 'physicalUnits.0',
})(SegmentPhysicalUnits)
