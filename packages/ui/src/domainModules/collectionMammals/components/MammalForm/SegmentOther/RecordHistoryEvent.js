import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { compose } from 'redux'

import createLog from 'utilities/log'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentOther:RecordHistoryEvent'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  getPath: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
}

const RecordHistoryEvent = ({ getPath }) => {
  log.render()
  return (
    <Grid.Row>
      <Grid.Column width={16}>
        <Header size="small">
          <ModuleTranslate textKey="catalogCard" />
        </Header>
      </Grid.Column>
      <Grid.Column computer={6} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          label={<ModuleTranslate textKey="createdBy" />}
          module="collectionMammals"
          name={getPath('agent')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={6} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          label={<ModuleTranslate textKey="date" />}
          module="collectionMammals"
          name={getPath('date.dateText')}
          type="text"
        />
      </Grid.Column>
    </Grid.Row>
  )
}

RecordHistoryEvent.propTypes = propTypes

export default compose(pathBuilder({ name: 'recordHistoryEvents' }))(
  RecordHistoryEvent
)
