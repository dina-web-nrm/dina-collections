import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Grid, Message } from 'semantic-ui-react'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'

const log = createLog('modules:agent:BaseForm:FormActions')
const ModuleTranslate = createModuleTranslate('agent')

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayResetButton: false,
  error: '',
}

export class FormActions extends Component {
  render() {
    log.render()
    const {
      displayBackButton,
      displayResetButton,
      error,
      invalid,
      onClose,
      pristine,
      reset,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Grid.Row>
        <Grid.Column mobile={16}>
          <Button disabled={submitting} size="large" type="submit">
            <ModuleTranslate textKey="save" />
          </Button>
          {displayResetButton && (
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
              type="button"
            >
              <ModuleTranslate textKey="reset" />
            </Button>
          )}

          {displayBackButton && (
            <Button basic onClick={onClose} size="large" type="button">
              <ModuleTranslate textKey="back" />
            </Button>
          )}

          <ConnectedFormSchemaError form="agent" />
          {invalid &&
            !error &&
            submitFailed && (
              <Message
                error
                header={<ModuleTranslate textKey="formContainsErrors" />}
              />
            )}
          {submitFailed &&
            error && (
              <Message
                content={error}
                error
                header={<ModuleTranslate textKey="submitFailed" />}
              />
            )}
          {submitSucceeded && (
            <Message header={<ModuleTranslate textKey="saved" />} success />
          )}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

FormActions.propTypes = propTypes
FormActions.defaultProps = defaultProps

export default FormActions
