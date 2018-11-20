import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  getFormValues,
  reset as resetActionCreator,
  startSubmit as startSubmitActionCreator,
  stopSubmit as stopSubmitActionCreator,
} from 'redux-form'

import { RecordActionBar } from 'coreModules/form/components'
import { RowLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import {
  CLOSE_ITEM_VIEW,
  DEL_SUCCESS,
  EDIT_SUCCESS,
} from 'coreModules/resourceManager/constants'
import crudActionCreators from 'coreModules/crud/actionCreators'
import extractProps from 'utilities/extractProps'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Edit`

  return {
    formName,
    values: getFormValues(formName)(state),
  }
}

const mapDispatchToProps = {
  reset: resetActionCreator,
  startSubmit: startSubmitActionCreator,
  stopSubmit: stopSubmitActionCreator,
}

const propTypes = {
  availableHeight: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchIncludeAfterUpdate: PropTypes.arrayOf(PropTypes.string),
  formName: PropTypes.string.isRequired,
  itemFetchOptions: PropTypes.object.isRequired,
  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
  renderEditForm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  fetchIncludeAfterUpdate: undefined,
  itemId: undefined,
  transformOutput: undefined,
  values: undefined,
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

    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  handleClose(event) {
    event.preventDefault()
    this.props.onInteraction(CLOSE_ITEM_VIEW)
  }

  handleDelete(event) {
    event.preventDefault()
    const { dispatch, itemId, resource } = this.props
    const del = crudActionCreators[resource] && crudActionCreators[resource].del

    return dispatch(
      del({
        id: itemId,
      })
    ).then(() => {
      this.props.onInteraction(DEL_SUCCESS)
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const {
      dispatch,
      fetchIncludeAfterUpdate,
      formName,
      itemId,
      resource,
      startSubmit,
      stopSubmit,
      transformOutput,
      values,
    } = this.props

    const update =
      crudActionCreators[resource] && crudActionCreators[resource].update

    startSubmit(formName)

    return dispatch(
      update({
        item: {
          id: itemId,
          ...(transformOutput ? transformOutput(values) : values),
        },
        nested: true,
      })
    ).then(() => {
      if (fetchIncludeAfterUpdate) {
        const getOne =
          crudActionCreators[resource] && crudActionCreators[resource].getOne

        dispatch(
          getOne({
            id: itemId,
            include: fetchIncludeAfterUpdate,
          })
        )
      }

      this.props.onInteraction(EDIT_SUCCESS)
      stopSubmit(formName)
    })
  }

  handleUndoChanges(event) {
    event.preventDefault()
    const { formName } = this.props
    this.props.reset(formName)
  }

  renderRow(key) {
    switch (key) {
      case 'itemEditForm': {
        const { availableHeight, itemId, renderEditForm } = this.props
        return renderEditForm({ availableHeight, itemId })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: ['formName'],
          props: this.props,
        })

        return (
          <RecordActionBar
            {...extractedProps}
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit}
            onUndoChanges={this.handleUndoChanges}
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  connect(null) // needed to get dispatch
)(EditItemColumn)
