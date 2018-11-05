import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormSyncErrors } from 'redux-form'
import { Button, Grid, Message } from 'semantic-ui-react'

import { ConnectedFormSchemaError } from 'coreModules/error/components'
import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('form')

const hasError = (syncErrors = {}) => {
  if (syncErrors.schemaErrors && syncErrors.schemaErrors.length) {
    return true
  }

  const errors = { ...syncErrors }

  delete errors.schemaErrors

  return Object.keys(errors).length > 0
}

const mapStateToProps = (state, { formName }) => {
  return {
    hasSyncErrors: hasError(getFormSyncErrors(formName)(state)),
  }
}

const propTypes = {
  editMode: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formName: PropTypes.string.isRequired,
  hasSyncErrors: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  onUndoChanges: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
}

export class FormActionBar extends PureComponent {
  render() {
    const {
      editMode,
      error,
      formName,
      hasSyncErrors,
      invalid,
      pristine,
      onUndoChanges: handleUndoChanges,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props

    return (
      <Grid padded>
        <Grid.Column>
          <Button
            disabled={hasSyncErrors || invalid || pristine || submitting}
            size="large"
            type="submit"
          >
            <ModuleTranslate textKey="save" />
          </Button>
          <Button
            basic
            disabled={pristine || submitting}
            onClick={handleUndoChanges}
            size="large"
            type="button"
          >
            Undo changes
          </Button>
          {!editMode && (
            <span style={{ marginLeft: '15px' }}>*New record*</span>
          )}
          {!pristine && <em style={{ marginLeft: '10px' }}>Unsaved changes</em>}
          <ConnectedFormSchemaError form={formName} />
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
      </Grid>
    )
  }
}

FormActionBar.propTypes = propTypes
FormActionBar.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(FormActionBar)
