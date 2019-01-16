import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import { AGENT_TYPE_OPTIONS } from '../../../constants'

export const FORM_NAME = 'normalizedAgentFilter'

const log = createLog('modules:agent:BaseForm')

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  error: '',
}

const noop = () => {}

export class BaseForm extends Component {
  render() {
    log.render()
    const { error, handleSubmit } = this.props
    return (
      <Grid padded>
        <Grid.Column>
          <Form error={!!error} onSubmit={handleSubmit(noop)}>
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Row>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Full agent name"
                    model="agent"
                    module="agent"
                    name="fullName"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={DropdownSearch}
                    fluid
                    label="Agent type"
                    model="agent"
                    module="agent"
                    name="agentType"
                    options={AGENT_TYPE_OPTIONS}
                    type="dropdown-search-local"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default reduxForm({
  destroyOnUnmount: false,
  form: FORM_NAME,
})(BaseForm)
