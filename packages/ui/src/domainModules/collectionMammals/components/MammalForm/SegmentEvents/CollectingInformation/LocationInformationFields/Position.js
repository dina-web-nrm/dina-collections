import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'
import { compose } from 'redux'

import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const propTypes = {
  getPath: PropTypes.func.isRequired,
}

function Position({ getPath }) {
  return (
    <Grid.Row>
      <Grid.Column mobile={16}>
        <Header size="small">Coordinate (interpreted)</Header>
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          module="collectionMammals"
          name={getPath('latitude')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          module="collectionMammals"
          name={getPath('longitude')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={4} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          module="collectionMammals"
          name={getPath('referenceSystem')}
          type="text"
        />
      </Grid.Column>
    </Grid.Row>
  )
}

Position.propTypes = propTypes

export default compose(pathBuilder({ name: 'position' }))(Position)
