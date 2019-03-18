import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon } from 'semantic-ui-react'
import objectPath from 'object-path'
import { isEmpty } from 'lodash'

import { buildYYYYMMDD, getYYYYMMDDFromTimestamp } from 'common/es5/date'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { AgentIdTextResult } from 'domainModules/agent/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  agent: PropTypes.object,
  date: PropTypes.object,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
}
const defaultProps = {
  agent: undefined,
  date: undefined,
  onEdit: undefined,
}

class EventRow extends PureComponent {
  render() {
    const {
      agent: eventAgent,
      date,
      description,
      onEdit: handleEdit,
    } = this.props

    let dateToShow
    if (date) {
      const startDate = objectPath.get(date, 'startDate')
      const dateText = objectPath.get(date, 'dateText')

      const YYYYMMDD = buildYYYYMMDD(startDate || {})

      dateToShow = YYYYMMDD || getYYYYMMDDFromTimestamp(dateText)
    }

    return (
      <Grid.Column width={16}>
        {dateToShow && `${dateToShow}: `}
        {`${description} `}
        {eventAgent && !isEmpty(eventAgent) && (
          <React.Fragment>
            <ModuleTranslate textKey="other.by" />{' '}
            <AgentIdTextResult
              includeVerbatimAgent
              input={{ value: eventAgent }}
              textOnly
            />
          </React.Fragment>
        )}
        {handleEdit && (
          <Icon
            data-testid="editRecordHistoryEventIcon"
            name="edit"
            onClick={handleEdit}
            size="large"
            style={{ cursor: 'pointer', marginLeft: '0.5em' }}
          />
        )}
      </Grid.Column>
    )
  }
}

EventRow.propTypes = propTypes
EventRow.defaultProps = defaultProps

export default EventRow
