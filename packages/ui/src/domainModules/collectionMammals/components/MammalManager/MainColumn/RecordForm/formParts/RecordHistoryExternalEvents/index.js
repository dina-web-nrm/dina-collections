import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Modal } from 'semantic-ui-react'
import { isEmpty } from 'lodash'

import config from 'config'
import { FormModal } from 'coreModules/form/components'
import formParts from 'coreModules/form/components/parts'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  CATALOG_CARD,
  CATALOG_CARD_CREATION_DESCRIPTION,
  MAM_2006_SYSTEM_NAME,
} from 'domainModules/collectionMammals/constants'

import Fields from './Fields'
import EventRow from './EventRow'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const { AddButton } = formParts

const mapStateToProps = (state, { formName, formValueSelector, name }) => {
  const recordHistoryEvents = formValueSelector(state, name)

  const catalogCardCreationEventIndex = (recordHistoryEvents || []).findIndex(
    ({ description }) => description === CATALOG_CARD_CREATION_DESCRIPTION
  )

  if (
    !recordHistoryEvents ||
    !recordHistoryEvents.length ||
    catalogCardCreationEventIndex === -1
  ) {
    return {
      catalogCardCreationEventIndex: -1,
      fieldsBaseName: `${name}.0`,
      otherEvents: recordHistoryEvents,
      recordHistoryEvents,
    }
  }

  const fieldsBaseName = `${name}.${
    catalogCardCreationEventIndex === -1
      ? recordHistoryEvents.length
      : catalogCardCreationEventIndex
  }`

  const catalogCardCreationEvent =
    recordHistoryEvents[catalogCardCreationEventIndex]
  const { agent, date } = catalogCardCreationEvent

  return {
    agent,
    catalogCardCreationEvent,
    catalogCardCreationEventIndex,
    fieldsBaseName,
    hasAgentOrDate: !isEmpty(agent) || !isEmpty(date),
    invalidInput: formSupportSelectors.getAnyFieldIsInvalid(state, {
      fieldNames: [`${fieldsBaseName}.agent`, `${fieldsBaseName}.date`],
      formName,
    }),
    otherEvents: recordHistoryEvents.filter(
      ({ system }) => system === MAM_2006_SYSTEM_NAME
    ),
    recordHistoryEvents,
  }
}

const propTypes = {
  catalogCardCreationEvent: PropTypes.shape({
    agent: PropTypes.object,
    date: PropTypes.object,
    description: PropTypes.string,
  }),
  catalogCardCreationEventIndex: PropTypes.number,
  changeFieldValue: PropTypes.func.isRequired,
  fieldsBaseName: PropTypes.string.isRequired,
  hasAgentOrDate: PropTypes.bool,
  invalidInput: PropTypes.bool,
  name: PropTypes.string.isRequired,
  otherEvents: PropTypes.arrayOf(
    PropTypes.shape({
      agent: PropTypes.object,
      date: PropTypes.object,
      description: PropTypes.string,
    })
  ),
  recordHistoryEvents: PropTypes.arrayOf(
    PropTypes.shape({
      agent: PropTypes.object,
      date: PropTypes.object,
      description: PropTypes.string,
    })
  ),
}
const defaultProps = {
  catalogCardCreationEvent: undefined,
  catalogCardCreationEventIndex: undefined,
  hasAgentOrDate: false,
  invalidInput: undefined,
  otherEvents: undefined,
  recordHistoryEvents: [],
}

class RecordHistoryExternalEvents extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      open: false,
    }
  }

  componentWillUnmount() {
    const {
      catalogCardCreationEventIndex,
      changeFieldValue,
      hasAgentOrDate,
      name,
      recordHistoryEvents,
    } = this.props

    if (
      recordHistoryEvents &&
      catalogCardCreationEventIndex > -1 &&
      !hasAgentOrDate
    ) {
      let updatedRecordHistoryEvents = [...recordHistoryEvents]
      updatedRecordHistoryEvents[catalogCardCreationEventIndex] = undefined
      updatedRecordHistoryEvents = updatedRecordHistoryEvents.filter(
        item => !!item
      )
      changeFieldValue(name, updatedRecordHistoryEvents)
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleOpen() {
    const {
      catalogCardCreationEventIndex,
      changeFieldValue,
      name,
      recordHistoryEvents,
    } = this.props

    if (catalogCardCreationEventIndex === -1) {
      changeFieldValue(`${name}.${recordHistoryEvents.length}`, {
        description: CATALOG_CARD_CREATION_DESCRIPTION,
        system: CATALOG_CARD,
      })
    }

    this.setState({ open: true })
  }

  render() {
    const {
      catalogCardCreationEvent,
      fieldsBaseName,
      hasAgentOrDate,
      invalidInput,
      otherEvents,
    } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        {otherEvents &&
          otherEvents.map(({ agent: eventAgent, date, description }, index) => {
            return (
              <EventRow
                agent={eventAgent}
                date={date}
                description={description}
                key={`${date}-${description}-${index}`} // eslint-disable-line react/no-array-index-key
              />
            )
          })}
        <FormModal
          onClose={this.handleClose}
          open={open}
          size="tiny"
          trigger={
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            !open &&
            (hasAgentOrDate ? (
              <EventRow
                agent={catalogCardCreationEvent.agent}
                date={catalogCardCreationEvent.date}
                description={catalogCardCreationEvent.description}
                onEdit={this.handleOpen}
              />
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
            <Grid>
              <Grid.Row className="relaxed">
                <Fields baseName={fieldsBaseName} />
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions style={{ textAlign: 'left' }}>
            <Button disabled={invalidInput} onClick={this.handleClose}>
              <ModuleTranslate capitalize textKey="other.done" />
            </Button>
          </Modal.Actions>
        </FormModal>
        {config.isTest && <Fields />}
      </React.Fragment>
    )
  }
}

RecordHistoryExternalEvents.propTypes = propTypes
RecordHistoryExternalEvents.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(RecordHistoryExternalEvents)
