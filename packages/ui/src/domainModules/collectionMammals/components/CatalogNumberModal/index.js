import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { isSubmitting } from 'redux-form'
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

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formName }) => {
  return {
    submitting: isSubmitting(formName)(state),
  }
}

const propTypes = {
  formName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func,
  history: PropTypes.object,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool,
}
const defaultProps = {
  handleSubmit: undefined,
  history: undefined,
  valid: false,
}

class CatalogNumberModal extends PureComponent {
  constructor() {
    super()

    this.handleBackToModalOne = this.handleBackToModalOne.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleGotoModalTwo = this.handleGotoModalTwo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      createManually: false,
    }
  }

  handleCancel() {
    this.props.history.go(-1)
  }

  handleBackToModalOne() {
    const { formName, reset } = this.props
    reset(formName)
    this.setState({ createManually: false })
  }

  handleGotoModalTwo() {
    this.setState({ createManually: true })
  }

  handleSubmit(formData) {
    this.props.handleSubmit(formData)
  }

  render() {
    const { submitting, valid } = this.props
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
                      className="transparent"
                      component={Input}
                      enableHelpNotifications={false}
                      helpText={
                        <ModuleTranslate textKey="other.sixOrEightDigits" />
                      }
                      label={<ModuleTranslate textKey="other.catalogNumber" />}
                      module="collectionMammals"
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
                disabled={!valid}
                loading={submitting}
                onClick={this.handleSubmit}
              >
                <ModuleTranslate textKey="other.useThisNumber" />
              </Button>
              <Button onClick={this.handleBackToModalOne}>
                <ModuleTranslate textKey="other.back" />
              </Button>
              <Button basic onClick={this.handleCancel}>
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
              <Button loading={submitting} onClick={this.handleSubmit}>
                <ModuleTranslate textKey="other.yesCreateNumber" />
              </Button>
              <Button onClick={this.handleGotoModalTwo}>
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
  connect(mapStateToProps),
  withRouter
)(CatalogNumberModal)
