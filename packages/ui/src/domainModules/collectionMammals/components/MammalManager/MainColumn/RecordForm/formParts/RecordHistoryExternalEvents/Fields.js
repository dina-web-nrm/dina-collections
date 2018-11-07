import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field, SingleDate } from 'coreModules/form/components'
import { AgentDropdownPickerSearch } from 'domainModules/agent/components'

const propTypes = {
  baseName: PropTypes.string.isRequired,
}

const Fields = ({ baseName }) => {
  return (
    <React.Fragment>
      <Grid.Column width={16}>
        <Field
          autoComplete="off"
          component={AgentDropdownPickerSearch}
          module="collectionMammals"
          name={`${baseName}.agent`}
          resultSuffix="(agent)"
          type="input-text"
        />
      </Grid.Column>
      <Grid.Column width={16}>
        <Field
          autoComplete="off"
          component={SingleDate}
          module="collectionMammals"
          name={`${baseName}.date`}
        />
      </Grid.Column>
    </React.Fragment>
  )
}

Fields.propTypes = propTypes

export default Fields
