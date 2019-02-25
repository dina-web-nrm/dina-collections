import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Icon, Table } from 'semantic-ui-react'

import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { updateUserPreference } from 'coreModules/user/actionCreators'
import {
  LanguageSelect,
  createModuleTranslate,
} from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('settings')

const mapDispatchToProps = {
  updateUserPreference,
}

const propTypes = {
  updateUserPreference: PropTypes.func.isRequired,
}

const Settings = props => {
  return (
    <PageTemplate>
      <h1>
        <Icon name="options" />
        <ModuleTranslate capitalize textKey="header" />
      </h1>
      <Segment padded>
        <Table color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <ModuleTranslate capitalize textKey="table.parameter" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <ModuleTranslate capitalize textKey="table.value" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <ModuleTranslate capitalize textKey="table.language" />
              </Table.Cell>
              <Table.Cell>
                {' '}
                <LanguageSelect
                  color="green"
                  onChange={language => {
                    props.updateUserPreference('language', language)
                  }}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    </PageTemplate>
  )
}

Settings.propTypes = propTypes

export default connect(
  undefined,
  mapDispatchToProps
)(Settings)
