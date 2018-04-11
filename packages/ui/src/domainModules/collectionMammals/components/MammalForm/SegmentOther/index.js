import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Segment } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { CustomData, Field, Input } from 'coreModules/form/components'

const log = createLog('modules:collectionMammals:MammalForm:SegmentOther')

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  readOnly: PropTypes.object,
}

const defaultProps = {
  readOnly: undefined,
}

class SegmentOther extends PureComponent {
  render() {
    const { readOnly } = this.props
    log.render()
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
                  scope="collectionItems"
                  textKey="storedUnderTaxonName"
                />
              }
              module="collectionMammals"
              name="collectionItems.0.physicalObject.storedUnderTaxonName"
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <CustomData
              autoComplete="off"
              disabled
              input={{ name: 'readOnly', value: readOnly }}
              label={<ModuleTranslate scope="other" textKey="readOnly" />}
              meta={{}}
              module="collectionMammals"
              name="readOnly"
              type="read-only"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentOther.propTypes = propTypes
SegmentOther.defaultProps = defaultProps

export default SegmentOther
