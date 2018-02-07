import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { createFormSchemaValidator } from 'utilities/error'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'
import login from '../actionCreators/login'
import { loginRequest as loginRequestSchema } from '../schemas'

const log = createLog('modules:user:LoginForm')
const ModuleTranslate = createModuleTranslate('user')

const mapDispatchToProps = {
  login,
}

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
}

export class RawLoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin(data) {
    return this.props.login(data).catch(error => {
      throw new SubmissionError({
        _error: error.error_description,
      })
    })
  }
  render() {
    log.render()
    const { error, handleSubmit, pristine, submitting } = this.props
    return (
      <Form error={!!error} onSubmit={handleSubmit(this.handleLogin)}>
        <Segment size="large" stacked>
          <Field
            autoComplete="off"
            component={Input}
            icon="user"
            module="user"
            name="username"
            placeholder="Username"
            type="text"
          />
          <Field
            autoComplete="off"
            component={Input}
            icon="lock"
            module="user"
            name="password"
            placeholder="Password"
            type="password"
          />

          <Button
            color="green"
            disabled={pristine || submitting}
            fluid
            size="large"
            type="submit"
          >
            <ModuleTranslate textKey="LoginForm.login" />
          </Button>
          {error && <Message error>{error}</Message>}
        </Segment>
      </Form>
    )
  }
}

RawLoginForm.propTypes = propTypes
RawLoginForm.defaultProps = defaultProps

export const LoginForm = reduxForm({
  form: 'simple',
  validate: createFormSchemaValidator(loginRequestSchema),
})(RawLoginForm)

export default compose(connect(null, mapDispatchToProps))(LoginForm)
