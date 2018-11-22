import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ConfirmationPopup,
  Field,
  Input,
  RangeDate,
} from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog('modules:agent:AgentRolesAccordion/AgentRoleContent')

const propTypes = {
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}

class AgentRoleContent extends Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    const {
      getTranslationPath,
      handleSetInactive,
      index,
      removeArrayFieldByIndex,
    } = this.props

    handleSetInactive(index)
    removeArrayFieldByIndex(getTranslationPath(), index)
  }

  render() {
    const { getPath, i18n: { moduleTranslate } } = this.props
    log.render()
    return (
      <Grid textAlign="left" verticalAlign="bottom">
        <Grid.Row className="relaxed">
          <Grid.Column width={10}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="agent"
              name={getPath('name')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="agent"
              name={getPath('affiliation.name')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              component={RangeDate}
              displayDateTypeRadios={false}
              displayEndDateLabel
              displayLabel={false}
              displayStartDateLabel
              displaySubLabels
              endDateLabel={moduleTranslate({
                capitalize: true,
                textKey: 'endDate',
              })}
              initialDateType="openRange"
              module="agent"
              name={getPath('dateRange')}
              stack
              startDateLabel={moduleTranslate({
                capitalize: true,
                textKey: 'startDate',
              })}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={16}>
            <ConfirmationPopup
              cancelButtonText={moduleTranslate({
                capitalize: true,
                textKey: 'cancel',
              })}
              confirmButtonText={moduleTranslate({
                capitalize: true,
                textKey: 'remove',
              })}
              header={moduleTranslate({
                capitalize: true,
                textKey: 'other.removeThisAgentRole',
              })}
              hideOnScroll
              onConfirm={this.handleRemove}
              text={moduleTranslate({
                capitalize: true,
                textKey: 'remove',
              })}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

AgentRoleContent.propTypes = propTypes

export default compose(withI18n({ module: 'agent' }), pathBuilder())(
  AgentRoleContent
)
