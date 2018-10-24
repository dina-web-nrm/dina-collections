import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getFormSyncErrors } from 'redux-form'
import { connect } from 'react-redux'
import { Button, Grid, Modal } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Coordinate, Field, Input } from 'coreModules/form/components'
import VerticalPosition from './VerticalPosition'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  errors: PropTypes.object,
  getPath: PropTypes.func.isRequired,
  module: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

const defaultProps = {
  errors: undefined,
}

class PositionModal extends Component {
  render() {
    const { errors, getPath, module, onClose: handleClose, open } = this.props
    const disableButton = Object.keys(errors).length > 0

    return (
      <Modal open={open} size="small">
        <Modal.Header>
          <ModuleTranslate module={module} textKey="headers.localityPosition" />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid>
              <Grid.Column width={13}>
                <Field
                  autoComplete="off"
                  component={Input}
                  fluid
                  module={module}
                  name={getPath('coordinatesVerbatim')}
                  type="text"
                />
              </Grid.Column>
              <Grid.Column width={16}>
                <Field
                  autoComplete="off"
                  component={Coordinate}
                  label={<ModuleTranslate textKey="other.coordinates" />}
                  latitudeLabel={<ModuleTranslate textKey="other.latitude" />}
                  longitudeLabel={<ModuleTranslate textKey="other.longitude" />}
                  module={module}
                  name={getPath('position')}
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Field
                  autoComplete="off"
                  component={Input}
                  fluid
                  module={module}
                  name={getPath('georeferenceSourcesText')}
                  type="text"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <Field
                  autoComplete="off"
                  component={Input}
                  fluid
                  module={module}
                  name={getPath('position.uncertaintyInMeters')}
                  type="number"
                />
              </Grid.Column>
              <Grid.Column width={16}>
                <VerticalPosition
                  label={<ModuleTranslate textKey="other.elevation" />}
                  max={getPath('verticalPosition.maximumElevationInMeters')}
                  min={getPath('verticalPosition.minimumElevationInMeters')}
                  name={getPath('verticalPosition')}
                />
              </Grid.Column>
              <Grid.Column width={16}>
                <VerticalPosition
                  label={<ModuleTranslate textKey="other.depth" />}
                  max={getPath('verticalPosition.maximumDepthInMeters')}
                  min={getPath('verticalPosition.minimumDepthInMeters')}
                  name={getPath('verticalPosition')}
                />
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ textAlign: 'left' }}>
          <Button basic disabled={disableButton} onClick={handleClose}>
            <ModuleTranslate textKey="other.done" />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

PositionModal.propTypes = propTypes
PositionModal.defaultProps = defaultProps

export default connect(state => {
  return {
    errors: getFormSyncErrors('editSpecimen')(state),
  }
})(PositionModal)
