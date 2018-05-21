import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Segment, Message } from 'semantic-ui-react'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { MAMMAL_FORM_NAME as FORM_NAME } from '../../constants'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  error: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
}

export class FormActions extends Component {
  render() {
    const {
      error,
      invalid,
      pristine,
      reset,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Segment>
        <div>
          <Button disabled={submitting} size="large" type="submit">
            <ModuleTranslate textKey="other.save" />
          </Button>
          <Button
            basic
            disabled={pristine || submitting}
            onClick={reset}
            size="large"
          >
            <ModuleTranslate textKey="other.cancel" />
          </Button>
          <ConnectedFormSchemaError form={FORM_NAME} />
          {invalid &&
            !error &&
            submitFailed && (
              <Message
                error
                header={<ModuleTranslate textKey="other.formContainsErrors" />}
              />
            )}
          {submitFailed &&
            error && (
              <Message
                content={error}
                error
                header={<ModuleTranslate textKey="other.submitFailed" />}
              />
            )}
          {submitSucceeded && (
            <Message
              header={<ModuleTranslate textKey="other.saved" />}
              success
            />
          )}
        </div>
      </Segment>
    )
  }
}

FormActions.propTypes = propTypes
FormActions.defaultProps = defaultProps

export default FormActions
