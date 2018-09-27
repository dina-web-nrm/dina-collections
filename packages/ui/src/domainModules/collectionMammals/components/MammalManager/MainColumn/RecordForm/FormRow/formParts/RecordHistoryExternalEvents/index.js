import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import objectPath from 'object-path'

import { buildYYYYMMDD, getYYYYMMDDFromTimestamp } from 'common/es5/date'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { AgentIdTextResult } from 'domainModules/agent/components'
import { MAM_2006_SYSTEM_NAME } from 'domainModules/collectionMammals/constants'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector, name }) => {
  const recordHistoryEvents = formValueSelector(state, name)

  return {
    otherEvents: (recordHistoryEvents || []).filter(
      ({ system }) => system === MAM_2006_SYSTEM_NAME
    ),
  }
}

const propTypes = {
  otherEvents: PropTypes.arrayOf(
    PropTypes.shape({
      agent: PropTypes.object,
      description: PropTypes.string,
    })
  ).isRequired,
}

class RecordHistoryExternalEvents extends PureComponent {
  render() {
    const { otherEvents } = this.props

    return (
      <React.Fragment>
        {otherEvents &&
          otherEvents.map(({ agent: eventAgent, date, description }) => {
            const timestamp = objectPath.get(
              date,
              'startDate.interpretedTimestamp'
            )
            const dateText = objectPath.get(date, 'dateText')

            const YYYYMMDD = timestamp
              ? getYYYYMMDDFromTimestamp(timestamp)
              : buildYYYYMMDD(date.startDate || {})

            const dateToShow = YYYYMMDD || dateText

            return (
              <Grid.Column width={16}>
                {(dateToShow && `${dateToShow}: `) || null}
                {`${description} `}
                <ModuleTranslate textKey="other.by" />{' '}
                <AgentIdTextResult input={{ value: eventAgent }} textOnly />
              </Grid.Column>
            )
          })}
      </React.Fragment>
    )
  }
}

RecordHistoryExternalEvents.propTypes = propTypes

export default compose(connect(mapStateToProps))(RecordHistoryExternalEvents)
