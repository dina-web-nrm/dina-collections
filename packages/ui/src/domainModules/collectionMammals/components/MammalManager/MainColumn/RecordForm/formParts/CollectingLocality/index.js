import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Button, Grid, Icon } from 'semantic-ui-react'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { Field, TextArea } from 'coreModules/form/components'
import createLog from 'utilities/log'

import Coordinates from './Coordinates'
import PositionModal from './PositionModal'

const log = createLog('modules:collectionMammals:MammalForm:CollectingLocality')

const buttonStyle = {
  float: 'left',
  marginBottom: '1.56em',
  paddingLeft: '1.32em',
  paddingRight: '1.32em',
}

const propTypes = {
  formName: PropTypes.string.isRequired,
  getPath: PropTypes.func.isRequired,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  module: PropTypes.string.isRequired,
}

const defaultProps = {
  latitude: undefined,
  longitude: undefined,
}

const mapStateToProps = (state, { formValueSelector, getPath }) => {
  return {
    latitude: formValueSelector(state, getPath('position.latitude')),
    longitude: formValueSelector(state, getPath('position.longitude')),
  }
}

class CollectingLocality extends PureComponent {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      open: false,
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  render() {
    const { formName, getPath, latitude, longitude, module } = this.props

    const { open } = this.state
    const hasCoordinates = latitude || longitude

    log.render()
    return (
      <React.Fragment>
        <Grid.Column width={11}>
          <Field
            autoComplete="off"
            component={TextArea}
            displayLabel
            fluid
            module={module}
            name={getPath('localityV')}
            rows={2}
            type="text"
          />
        </Grid.Column>
        {hasCoordinates ? (
          <Grid.Column width={16}>
            <Coordinates
              latitude={latitude}
              longitude={longitude}
              module={module}
              onEdit={this.handleOpen}
            />
          </Grid.Column>
        ) : (
          <Grid.Column width={5}>
            <Button
              floated="left"
              onClick={this.handleOpen}
              style={buttonStyle}
              type="button"
            >
              <Icon name="marker" />
              <ModuleTranslate
                capitalize
                module={module}
                textKey="other.addPosition"
              />
            </Button>
          </Grid.Column>
        )}

        <PositionModal
          formName={formName}
          getPath={getPath}
          module={module}
          name={getPath('position')}
          onClose={this.handleClose}
          open={open}
        />
      </React.Fragment>
    )
  }
}

CollectingLocality.propTypes = propTypes
CollectingLocality.defaultProps = defaultProps

export default compose(pathBuilder(), connect(mapStateToProps))(
  CollectingLocality
)
