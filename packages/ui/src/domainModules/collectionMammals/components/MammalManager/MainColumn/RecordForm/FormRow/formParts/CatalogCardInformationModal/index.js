import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Icon, Modal } from 'semantic-ui-react'
import { isEmpty } from 'lodash'

import config from 'config'
import formParts from 'coreModules/form/components/parts'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { AgentIdTextResult } from 'domainModules/agent/components'
import {
  CATALOG_CARD_CREATION_DESCRIPTION,
  MAM_2006_SYSTEM_NAME,
} from 'domainModules/collectionMammals/constants'
import Fields from '../CatalogCardInformation/Fields'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const { AddButton } = formParts

const mapStateToProps = (state, { formValueSelector, name }) => {
  const recordHistoryEvents = formValueSelector(state, name)
  if (!recordHistoryEvents || !recordHistoryEvents.length) {
    return {
      baseName: `${name}.0`,
      hasAuthorOrDate: false,
    }
  }

  const catalogCardCreationEventIndex = recordHistoryEvents.findIndex(
    ({ description }) => description === CATALOG_CARD_CREATION_DESCRIPTION
  )

  if (catalogCardCreationEventIndex === -1) {
    throw new Error('Missing record history event for catalog card creation')
  }

  const { agent, date } = recordHistoryEvents[catalogCardCreationEventIndex]

  return {
    agent,
    baseName: `${name}.${catalogCardCreationEventIndex}`,
    hasAuthorOrDate: !isEmpty(agent) || !isEmpty(date),
    otherEvents: recordHistoryEvents.filter(
      ({ system }) => system === MAM_2006_SYSTEM_NAME
    ),
  }
}

const propTypes = {
  agent: PropTypes.object,
  baseName: PropTypes.string.isRequired,
  hasAuthorOrDate: PropTypes.bool.isRequired,
  otherEvents: PropTypes.arrayOf(
    PropTypes.shape({
      agent: PropTypes.object,
      description: PropTypes.string,
    })
  ),
}
const defaultProps = {
  agent: undefined,
  otherEvents: undefined,
}

class CatalogCardInformationModal extends Component {
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
      agent,
      baseName,
      hasAuthorOrDate,
      otherEvents,
    } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        {otherEvents &&
          otherEvents.map(({ agent: eventAgent, description }) => {
            return (
              <Grid.Column width={16}>
                {`${description} `}
                <ModuleTranslate textKey="other.by" />{' '}
                <AgentIdTextResult input={{ value: eventAgent }} textOnly />
              </Grid.Column>
            )
          })}
        <Modal
          open={open}
          size="tiny"
          trigger={
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            !open &&
            (hasAuthorOrDate ? (
              <Grid.Column width={16}>
                <ModuleTranslate capitalize textKey="other.catalogCardBy" />{' '}
                <AgentIdTextResult input={{ value: agent }} textOnly />{' '}
                <Icon
                  name="edit"
                  onClick={this.handleOpen}
                  size="large"
                  style={{ cursor: 'pointer' }}
                />
              </Grid.Column>
            ) : (
              <AddButton
                onClick={event => {
                  event.preventDefault()
                  this.handleOpen()
                }}
                textKey="other.addCatalogCardCreation"
              />
            ))
            /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          }
        >
          <Modal.Header>
            <ModuleTranslate textKey="other.addCatalogCardInformation" />
          </Modal.Header>
          <Modal.Content>
            <Fields
              baseName={baseName}
            />
          </Modal.Content>
          <Modal.Actions style={{ textAlign: 'left' }}>
            <Button onClick={this.handleClose}>
              <ModuleTranslate capitalize textKey="other.done" />
            </Button>
          </Modal.Actions>
        </Modal>
        {config.isTest && <Fields />}
      </React.Fragment>
    )
  }
}

CatalogCardInformationModal.propTypes = propTypes
CatalogCardInformationModal.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(CatalogCardInformationModal)
