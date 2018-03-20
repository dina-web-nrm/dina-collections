import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDistinguishedUnits'
)

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'distinguishedUnits',
})

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

class SegmentDistinguishedUnits extends PureComponent {
  render() {
    const { getPath } = this.props
    log.render()
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
              label={<ModuleTranslate textKey="physicalUnitText" />}
              module="collectionMammals"
              name={getPath('physicalUnitText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="normalStorageLocationText" />}
              module="collectionMammals"
              name={getPath('physicalUnit.normalStorageLocationText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="alternateIdentifiersText" />}
              module="collectionMammals"
              name={getPath('alternateIdentifiersText')}
              type="text"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentDistinguishedUnits.propTypes = propTypes

export default pathBuilder({
  name: 'distinguishedUnits.0',
})(SegmentDistinguishedUnits)
