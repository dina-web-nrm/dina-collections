import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Header, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import {
  // DropdownSearch,
  Field,
  Input,
  TextArea,
} from 'coreModules/form/components'

export const FORM_NAME = 'agentEdit'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  error: '',
}

export class BaseForm extends Component {
  render() {
    log.render()
    const { error, handleSubmit } = this.props
    return (
      <Grid padded>
        <Grid.Column>
          <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Row>
                <Grid.Column width={16}>
                  <Header size="tiny">Agent type</Header>
                </Grid.Column>
                <Grid.Column computer={2} mobile={8} tablet={4}>
                  <label htmlFor="agentType person">
                    <Field
                      component="input"
                      name="agentType"
                      type="radio"
                      value="person"
                    />{' '}
                    Person
                  </label>
                </Grid.Column>
                <Grid.Column computer={14} mobile={8} tablet={12}>
                  <label htmlFor="agentType organization">
                    <Field
                      component="input"
                      name="agentType"
                      type="radio"
                      value="organization"
                    />{' '}
                    Organisation
                  </label>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="fullName"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="disambiguatingDescription"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="givenName"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="familyName"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="additionalName"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="abbreviation"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="alsoKnownAs"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={16}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="remarks"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="telephone"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <Field
                    autoComplete="off"
                    component={Input}
                    model="agent"
                    module="agent"
                    name="email"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={16}>
                  <Field
                    autoComplete="off"
                    component={TextArea}
                    model="agent"
                    module="agent"
                    name="postalAddress"
                    type="text"
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
  destroyOnUnmount: false, // to keep values when switching layout
  enableReinitialize: true,
  form: FORM_NAME,
  validate: formValidator({ model: 'agent' }),
})(BaseForm)
