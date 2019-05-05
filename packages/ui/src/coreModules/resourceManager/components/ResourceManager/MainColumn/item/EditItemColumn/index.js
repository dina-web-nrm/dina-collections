import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { capitalizeFirstLetter } from 'common/src/stringFormatters'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import extractProps from 'utilities/extractProps'
import { EditItemActionBar } from '../ActionBars'

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
  formName: PropTypes.string,
  itemId: PropTypes.string.isRequired,
  loadingDelete: PropTypes.bool,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  relationshipsToCheckBeforeDelete: PropTypes.arrayOf(PropTypes.string),
  renderEditForm: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
}
const defaultProps = {
  buildEditItemHeaders: defaultBuildItemHeaders,
  formName: undefined,
  loadingDelete: false,
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
        return this.props.renderEditForm({
          ...this.props,
          itemHeader,
          itemSubHeader,
        })
      }
      case 'bottomBar': {
        const { formName } = this.props
        const { extractedProps } = extractProps({
          keys: [
            'fetchOneItemById',
            'fetchRelationshipsBeforeDelete',
            'filterResourceCount',
            'itemId',
            'loadingDelete',
            'nestedItem',
            'onInteraction',
            'relationshipsToCheckBeforeDelete',
            'resource',
            'transformOutput',
          ],
          props: this.props,
        })

        return (
          <EditItemActionBar
            {...extractedProps}
            formName={formName || `${resource}Edit`}
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
