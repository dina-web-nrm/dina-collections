import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { defaultValidate } from 'coreModules/form/components/fields/Date/SingleDate'
import formParts from 'coreModules/form/components/parts'
import agentParts from 'domainModules/agent/components/formParts'

const { SingleDate } = formParts
const { AgentDropdownPickerSearch } = agentParts

const propTypes = {
  baseName: PropTypes.string.isRequired,
  setChildDirty: PropTypes.func.isRequired,
  setChildInvalid: PropTypes.func.isRequired,
}

const Fields = ({ baseName, setChildDirty, setChildInvalid }) => {
  return (
    <Grid>
      <Grid.Row className="relaxed">
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={AgentDropdownPickerSearch}
            module="collectionMammals"
            name={`${baseName}.agent`}
            resultSuffix="(agent)"
            setChildDirty={setChildDirty}
            setChildInvalid={setChildInvalid}
            type="input-text"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            component={SingleDate}
            label="Condition"
            module="collectionMammals"
            name={`${baseName}.date`}
            setChildDirty={setChildDirty}
            setChildInvalid={setChildInvalid}
            validate={defaultValidate}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

Fields.propTypes = propTypes

export default Fields
