import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isSubmitting, reset } from 'redux-form'
import { Button, Grid, Modal } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, FormModal, Input } from 'coreModules/form/components'

const mustBe6Or8Digits = value => {
  const regex = /^(\d{6}|\d{8})$/

  if (!value) {
    return {
      errorCode: 'INVALID_CATALOG_NUMBER',
    }
  }
  if (!value.match(regex)) {
    return {
      errorCode: 'INVALID_CATALOG_NUMBER',
    }
  }
  return undefined
}

const ModuleTranslate = createModuleTranslate('specimen')

const mapStateToProps = (state, { formName }) => {
  return {
    submitting: isSubmitting(formName)(state),
  }
}
const mapDispatchToProps = {
  resetForm: reset,
}

const propTypes = {
  formName: PropTypes.string.isRequired,
  history: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool,
}
const defaultProps = {
  history: undefined,
  valid: false,
}

class CatalogNumberModal extends PureComponent {
  constructor() {
    super()

    this.handleBackToModalOne = this.handleBackToModalOne.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleGotoModalTwo = this.handleGotoModalTwo.bind(this)

    this.state = {
      createManually: false,
    }
  }

  handleCancel() {
    this.props.history.go(-1)
  }

  handleBackToModalOne() {
    const { formName, resetForm } = this.props
    resetForm(formName)
    this.setState({ createManually: false })
  }

  handleGotoModalTwo() {
    this.setState({ createManually: true })
  }

  render() {
    const { onSubmit: handleSubmit, submitting, valid } = this.props
    const { createManually } = this.state

    return (
      <FormModal open size="small">
        <Modal.Header>
          <ModuleTranslate textKey="other.createNewSpecimen" />
        </Modal.Header>
        {createManually && (
          <React.Fragment>
            <Modal.Content>
              <Modal.Description>
                <Grid>
                  <Grid.Column width={8}>
                    <Field
                      autoComplete="off"
                      component={Input}
                      enableHelpNotifications={false}
                      helpText={
                        <ModuleTranslate textKey="other.sixOrEightDigits" />
                      }
                      label={<ModuleTranslate textKey="other.catalogNumber" />}
                      module="specimen"
                      name="individual.identifiers.0.value"
                      type="text"
                      validate={[mustBe6Or8Digits]}
                    />
                  </Grid.Column>
                </Grid>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions style={{ textAlign: 'left' }}>
              <Button
                data-testid="useThisNumber"
                disabled={!valid}
                loading={submitting}
                onClick={handleSubmit}
              >
                <ModuleTranslate textKey="other.useThisNumber" />
              </Button>
              <Button data-testid="back" onClick={this.handleBackToModalOne}>
                <ModuleTranslate textKey="other.back" />
              </Button>
              <Button basic data-testid="cancel" onClick={this.handleCancel}>
                <ModuleTranslate textKey="other.cancel" />
              </Button>
            </Modal.Actions>
          </React.Fragment>
        )}

        {!createManually && (
          <React.Fragment>
            <Modal.Content>
              <Modal.Description>
                <ModuleTranslate textKey="other.automaticCatalogNumber" />
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions style={{ textAlign: 'left' }}>
              <Button
                data-testid="createAutomaticNumber"
                loading={submitting}
                onClick={handleSubmit}
              >
                <ModuleTranslate textKey="other.yesCreateNumber" />
              </Button>
              <Button
                data-testid="enterManualNumber"
                onClick={this.handleGotoModalTwo}
              >
                <ModuleTranslate textKey="other.enterManually" />
              </Button>
              <Button basic onClick={this.handleCancel}>
                <ModuleTranslate textKey="other.cancel" />
              </Button>
            </Modal.Actions>
          </React.Fragment>
        )}
      </FormModal>
    )
  }
}

CatalogNumberModal.propTypes = propTypes
CatalogNumberModal.defaultProps = defaultProps

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(CatalogNumberModal)
