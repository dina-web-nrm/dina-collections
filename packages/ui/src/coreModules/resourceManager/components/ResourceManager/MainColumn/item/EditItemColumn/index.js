import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import RecordActionBar from '../RecordActionBar'
import {
  createHandleDelete,
  createHandleEditSubmit,
  createHandleUndoChanges,
} from '../RecordActionBar/higherOrderComponents'

const EnhancedRecordActionBar = compose(
  createHandleDelete(),
  createHandleEditSubmit(),
  createHandleUndoChanges()
)(RecordActionBar)

const defaultBuildItemHeaders = nestedItem => {
  if (!nestedItem) {
    return {}
  }

  return {
    itemHeader: nestedItem.name,
    itemSubHeader: capitalizeFirstLetter(nestedItem.group),
  }
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  buildEditItemHeaders: PropTypes.func,
  itemId: PropTypes.string.isRequired,
  loadingDelete: PropTypes.bool.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  relationshipsToCheckBeforeDelete: PropTypes.arrayOf(PropTypes.string),
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  buildEditItemHeaders: defaultBuildItemHeaders,
  nestedItem: undefined,
  relationshipsToCheckBeforeDelete: [],
}

const rows = [
  {
    key: 'itemEditForm',
    style: { overflow: 'auto' },
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
  },
]

class EditItemColumn extends Component {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(key) {
    const { buildEditItemHeaders, nestedItem, resource } = this.props

    const { itemHeader, itemSubHeader } = buildEditItemHeaders(nestedItem)

    switch (key) {
      case 'itemEditForm': {
        const { renderEditForm } = this.props

        const { extractedProps } = extractProps({
          keys: ['availableHeight', 'nestedItem'],
          props: this.props,
        })
        return renderEditForm({
          ...extractedProps,
          itemHeader,
          itemSubHeader,
        })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: [
            'fetchOneItemById',
            'fetchRelationshipsBeforeDelete',
            'itemId',
            'loadingDelete',
            'onInteraction',
            'relationshipsToCheckBeforeDelete',
            'resource',
          ],
          props: this.props,
        })

        return (
          <EnhancedRecordActionBar
            {...extractedProps}
            formName={`${resource}Edit`}
            itemHeader={itemHeader}
            itemSubHeader={itemSubHeader}
          />
        )
      }
      default: {
        throw new Error(`Unknown row: ${key}`)
      }
    }
  }

  render() {
    const { availableHeight, itemId } = this.props

    return (
      <RowLayout
        availableHeight={availableHeight}
        itemId={itemId}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

EditItemColumn.defaultProps = defaultProps
EditItemColumn.propTypes = propTypes

export default compose(createGetNestedItemById())(EditItemColumn)
