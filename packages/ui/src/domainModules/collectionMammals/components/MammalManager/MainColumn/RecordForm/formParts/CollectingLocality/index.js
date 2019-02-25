import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Button, Grid, Icon } from 'semantic-ui-react'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { Field, TextArea } from 'coreModules/form/components'
import createLog from 'utilities/log'

import CollectingPosition from './CollectingPosition'
import PositionModal from './PositionModal'

const log = createLog('modules:collectionMammals:MammalForm:CollectingLocality')

const buttonStyle = {
  float: 'left',
  marginBottom: '1.56em',
  paddingLeft: '1.32em',
  paddingRight: '1.32em',
}

const propTypes = {
  coordinatesVerbatim: PropTypes.string,
  formName: PropTypes.string.isRequired,
  georeferenceSourcesText: PropTypes.string,
  getPath: PropTypes.func.isRequired,
  module: PropTypes.string.isRequired,
  position: PropTypes.object,
  verticalPosition: PropTypes.object,
}

const defaultProps = {
  coordinatesVerbatim: undefined,
  georeferenceSourcesText: undefined,
  position: undefined,
  verticalPosition: undefined,
}

const mapStateToProps = (state, { formValueSelector, getPath }) => {
  return {
    coordinatesVerbatim: formValueSelector(
      state,
      getPath('coordinatesVerbatim')
    ),
    georeferenceSourcesText: formValueSelector(
      state,
      getPath('georeferenceSourcesText')
    ),
    position: formValueSelector(state, getPath('position')),
    verticalPosition: formValueSelector(state, getPath('verticalPosition')),
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
    const {
      coordinatesVerbatim,
      georeferenceSourcesText,
      getPath,
      formName,
      module,
      position,
      verticalPosition,
    } = this.props

    const { open } = this.state

    const hasPosition = position && Object.keys(position).length
    const hasVerticalPosition =
      verticalPosition && Object.keys(verticalPosition).length
    const hasPositionData =
      coordinatesVerbatim ||
      georeferenceSourcesText ||
      hasPosition ||
      hasVerticalPosition

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
        {hasPositionData ? (
          <Grid.Column width={11}>
            <CollectingPosition
              coordinatesVerbatim={coordinatesVerbatim}
              georeferenceSourcesText={georeferenceSourcesText}
              module={module}
              onEdit={this.handleOpen}
              position={position}
              verticalPosition={verticalPosition}
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

export default compose(
  pathBuilder(),
  connect(mapStateToProps)
)(CollectingLocality)
