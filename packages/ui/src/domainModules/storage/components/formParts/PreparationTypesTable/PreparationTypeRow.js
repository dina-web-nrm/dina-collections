import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Table } from 'semantic-ui-react'

import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { ConfirmationPopup } from 'coreModules/form/components'
import { ModuleTranslate } from 'coreModules/i18n/components'

const propTypes = {
  disconnectPreparationType: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  item: PropTypes.object,
}
const defaultProps = {
  item: undefined,
}

class PreparationTypeRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  handleDisconnect() {
    this.props.disconnectPreparationType(this.props.index)
  }

  render() {
    const { item } = this.props

    const { attributes: { name } = {} } = item || {}

    return (
      <Table.Row>
        <Table.Cell width={14}>{capitalizeFirstLetter(name)}</Table.Cell>
        <Table.Cell>
          <ConfirmationPopup
            cancelButtonText={
              <ModuleTranslate capitalize module="storage" textKey="cancel" />
            }
            confirmButtonText={
              <ModuleTranslate capitalize module="storage" textKey="remove" />
            }
            header={
              <ModuleTranslate
                capitalize
                module="storage"
                textKey="removeThisConnectedPreparationTypes"
              />
            }
            hideOnScroll
            iconName="trash"
            onConfirm={this.handleDisconnect}
            size="large"
            type="icon"
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

PreparationTypeRow.propTypes = propTypes
PreparationTypeRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'preparationType',
  })
)(PreparationTypeRow)
