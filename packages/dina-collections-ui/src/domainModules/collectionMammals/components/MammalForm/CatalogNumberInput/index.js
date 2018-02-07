import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Button, Form, Header, Input, Modal } from 'semantic-ui-react'
import { FormFieldError } from 'coreModules/error/components'
import FieldLabel from 'coreModules/form/components/FieldLabel'

import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'catalogNumber',
})

const propTypes = {
  autoComplete: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  errorScope: PropTypes.string,
  helpNotificationProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  match: PropTypes.shape({
    params: PropTypes.shape({
      catalogNumber: PropTypes.string,
    }).isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  module: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  scope: PropTypes.string,
  type: PropTypes.string.isRequired,
}
const defaultProps = {
  autoComplete: undefined,
  errorScope: undefined,
  helpNotificationProps: undefined,
  helpText: undefined,
  icon: undefined,
  iconPosition: 'left',
  label: undefined,
  placeholder: undefined,
  required: false,
  scope: undefined,
}

class CatalogNumberInput extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      // set catalogNumber from route params to avoid flickering header
      catalogNumber: props.match.params.catalogNumber,
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    // update if catalogNumber is changed in other way than modal, e.g. through
    // initialize()
    if (!this.state.open && this.props.input.value !== nextProps.input.value) {
      this.setState({ catalogNumber: nextProps.input.value })
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ catalogNumber: this.props.input.value, open: false })
  }

  render() {
    const {
      autoComplete,
      editMode,
      errorScope,
      label,
      icon,
      iconPosition,
      input,
      meta: { touched, error },
      module,
      placeholder,
      required,
      helpText,
      helpNotificationProps,
      scope,
      type,
    } = this.props
    const { open } = this.state
    const displayError = touched && !!error
    const initializedWithValue = !!this.state.catalogNumber

    return (
      <Header as="h1">
        {this.state.catalogNumber || <ModuleTranslate textKey="newSpecimen" />}{' '}
        {!open && (
          // since the tests cannot select the input in the modal we add this
          // hidden input
          <input
            name={input.name}
            onChange={input.onChange}
            type="hidden"
            value={input.value}
          />
        )}
        {!editMode && (
          <Modal
            open={open}
            size="mini"
            trigger={
              /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
              !open && (
                <a className="side-link" onClick={this.handleOpen}>
                  {' '}
                  {initializedWithValue ? (
                    <ModuleTranslate textKey="edit" />
                  ) : (
                    <ModuleTranslate textKey="addCatalogNumber" />
                  )}
                </a>
              )
              /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            }
          >
            <Modal.Header>
              {initializedWithValue ? (
                <ModuleTranslate textKey="editCatalogNumber" />
              ) : (
                <ModuleTranslate textKey="addCatalogNumber" />
              )}
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form.Field
                  error={displayError}
                  required={required}
                  style={{ position: 'relative' }}
                >
                  <ModuleTranslate textKey="addCatalogNumberModal" />
                  <br />
                  {(label || helpNotificationProps) && (
                    <FieldLabel
                      helpNotificationProps={helpNotificationProps}
                      helpText={helpText}
                      htmlFor={input.name}
                      label={label}
                    />
                  )}
                  <br />
                  <Input
                    autoComplete={autoComplete}
                    icon={icon}
                    iconPosition={icon && iconPosition}
                    placeholder={placeholder}
                    scope={scope}
                    type={type}
                    {...input}
                  />
                  {displayError && (
                    <FormFieldError
                      error={error}
                      module={module}
                      scope={errorScope || input.name}
                    />
                  )}
                </Form.Field>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleClose}>
                <ModuleTranslate textKey="cancel" />
              </Button>
              <Button
                disabled={displayError}
                onClick={this.handleSubmit}
                positive
              >
                {initializedWithValue ? (
                  <ModuleTranslate textKey="saveChanges" />
                ) : (
                  <ModuleTranslate textKey="add" />
                )}
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </Header>
    )
  }
}

CatalogNumberInput.propTypes = propTypes
CatalogNumberInput.defaultProps = defaultProps

export default withRouter(CatalogNumberInput)
