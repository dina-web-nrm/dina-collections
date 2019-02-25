import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Button, Grid, Message } from 'semantic-ui-react'

import config from 'config'
import { ConnectedFormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { ConfirmationPopup } from 'coreModules/form/components'

const log = createLog(
  'modules:collectionMammals:CuratorialAssessmentForm:FormActions'
)
const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  displayBackButton: PropTypes.bool,
  displayRemoveButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  displayBackButton: false,
  displayRemoveButton: false,
  displayResetButton: false,
  error: '',
  onRemove: undefined,
}

export class FormActions extends PureComponent {
  render() {
    const skipRemoveConfirmation = config.isTest

    log.render()
    const {
      displayBackButton,
      displayRemoveButton,
      displayResetButton,
      error,
      form,
      invalid,
      onClose: handleClose,
      onRemove: handleRemove,
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
            <ModuleTranslate textKey="other.save" />
          </Button>
          {displayResetButton && (
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
              type="button"
            >
              <ModuleTranslate textKey="other.reset" />
            </Button>
          )}
          {displayBackButton && (
            <Button basic onClick={handleClose} size="large" type="button">
              <ModuleTranslate textKey="other.cancel" />
            </Button>
          )}
          {displayRemoveButton && skipRemoveConfirmation && handleRemove && (
            <Button onClick={handleRemove}>
              <ModuleTranslate textKey="other.remove" />
            </Button>
          )}
          {displayRemoveButton && !skipRemoveConfirmation && handleRemove && (
            <ConfirmationPopup
              cancelButtonText={<ModuleTranslate textKey="other.cancel" />}
              confirmButtonText={<ModuleTranslate textKey="other.remove" />}
              header={
                <ModuleTranslate textKey="other.removeThisCuratorialAssessment" />
              }
              hideOnScroll
              onConfirm={handleRemove}
              size="large"
              text={<ModuleTranslate textKey="other.remove" />}
            />
          )}
          <ConnectedFormSchemaError form={form} />
          {invalid && !error && submitFailed && (
            <Message
              error
              header={<ModuleTranslate textKey="other.formContainsErrors" />}
            />
          )}
          {submitFailed && error && (
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
        </Grid.Column>
      </Grid.Row>
    )
  }
}

FormActions.propTypes = propTypes
FormActions.defaultProps = defaultProps

export default FormActions
