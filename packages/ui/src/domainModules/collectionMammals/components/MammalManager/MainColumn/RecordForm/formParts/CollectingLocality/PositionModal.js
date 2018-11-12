import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Grid, Modal } from 'semantic-ui-react'
import memoize from 'memoize-one'

import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  Coordinates,
  Field,
  FormModal,
  Input,
} from 'coreModules/form/components'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import VerticalPosition from './VerticalPosition'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const getFieldNames = memoize(getPath => {
  return [
    getPath('coordinatesVerbatim'),
    getPath('position.latitude'),
    getPath('position.longitude'),
    getPath('georeferenceSourcesText'),
    getPath('position.uncertaintyInMeters'),
    getPath('verticalPosition'),
    getPath('verticalPosition'),
  ]
})

const mapStateToProps = (state, { formName, getPath }) => {
  return {
    isInvalid: formSupportSelectors.getAnyFieldIsInvalid(state, {
      fieldNames: getFieldNames(getPath),
      formName,
    }),
  }
}

const propTypes = {
  getPath: PropTypes.func.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  module: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

class PositionModal extends PureComponent {
  render() {
    const {
      isInvalid,
      getPath,
      module,
      onClose: handleClose,
      open,
    } = this.props

    return (
      <FormModal onClose={handleClose} open={open} size="tiny">
        <Modal.Header>
          <ModuleTranslate module={module} textKey="headers.localityPosition" />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Grid>
              <Grid.Row className="relaxed">
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
                    component={Coordinates}
                    label={<ModuleTranslate textKey="other.coordinates" />}
                    latitudeLabel={<ModuleTranslate textKey="other.latitude" />}
                    longitudeLabel={
                      <ModuleTranslate textKey="other.longitude" />
                    }
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
                    module={module}
                    name={getPath('verticalPosition')}
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <VerticalPosition
                    label={<ModuleTranslate textKey="other.depth" />}
                    max={getPath('verticalPosition.maximumDepthInMeters')}
                    min={getPath('verticalPosition.minimumDepthInMeters')}
                    module={module}
                    name={getPath('verticalPosition')}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={{ textAlign: 'left' }}>
          <Button disabled={isInvalid} onClick={handleClose}>
            <ModuleTranslate textKey="other.done" />
          </Button>
        </Modal.Actions>
      </FormModal>
    )
  }
}

PositionModal.propTypes = propTypes

export default connect(mapStateToProps)(PositionModal)
