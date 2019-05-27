import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import createFormModuleWrapper from '../../higherOrderComponents/createFormModuleWrapper'
import createCreateItemWrapper from '../../higherOrderComponents/createCreateItemWrapper'
import ActionBar from '../ActionBar'

const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
}

const CreateItemColumn = props => {
  const { availableHeight, renderCreateForm } = props

  return (
    <RowLayout availableHeight={availableHeight}>
      <RowLayout.Row style={overflowAuto}>
        {renderCreateForm({
          ...props,
        })}
      </RowLayout.Row>
      <RowLayout.Row height={emToPixels(4.625)}>
        <ActionBar {...pick(props, ['formName', 'onCancel', 'onSubmit'])} />
      </RowLayout.Row>
    </RowLayout>
  )
}

CreateItemColumn.propTypes = propTypes

export default compose(
  createFormModuleWrapper(),
  createCreateItemWrapper()
)(CreateItemColumn)
