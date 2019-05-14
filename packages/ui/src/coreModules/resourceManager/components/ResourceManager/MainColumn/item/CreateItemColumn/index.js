import React from 'react'
import PropTypes from 'prop-types'
import { pick } from 'lodash'

import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { CreateItemActionBar } from '../ActionBars'

const overflowAuto = { overflow: 'auto' }

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  formName: PropTypes.string,
  renderCreateForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  formName: undefined,
}

const CreateItemColumn = props => {
  const { availableHeight, formName, renderCreateForm, resource } = props

  return (
    <RowLayout availableHeight={availableHeight}>
      <RowLayout.Row style={overflowAuto}>
        {renderCreateForm({
          ...props,
        })}
      </RowLayout.Row>
      <RowLayout.Row height={emToPixels(4.625)}>
        <CreateItemActionBar
          {...pick(props, [
            'filterResourceCount',
            'formName',
            'onInteraction',
            'resource',
            'transformOutput',
          ])}
          formName={formName || `${resource}Create`}
        />
      </RowLayout.Row>
    </RowLayout>
  )
}

CreateItemColumn.propTypes = propTypes
CreateItemColumn.defaultProps = defaultProps

export default CreateItemColumn
