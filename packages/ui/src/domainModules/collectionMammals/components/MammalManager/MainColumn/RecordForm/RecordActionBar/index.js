import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Message } from 'semantic-ui-react'

import { ConnectedFormSchemaError } from 'coreModules/error/components'
import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  editMode: PropTypes.bool.isRequired,
  error: PropTypes.string,
  form: PropTypes.string.isRequired,
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

export class RecordActionBar extends PureComponent {
  render() {
    const {
      editMode,
      error,
      form,
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
            disabled={invalid || pristine || submitting}
            size="large"
            type="submit"
          >
            <ModuleTranslate textKey="other.save" />
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
          <ConnectedFormSchemaError form={form} />
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
        </Grid.Column>
      </Grid>
    )
  }
}

RecordActionBar.propTypes = propTypes
RecordActionBar.defaultProps = defaultProps

export default RecordActionBar
