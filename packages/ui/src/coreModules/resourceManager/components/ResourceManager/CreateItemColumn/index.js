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
  CREATE_SUCCESS,
} from 'coreModules/resourceManager/constants'
import crudActionCreators from 'coreModules/crud/actionCreators'
import extractProps from 'utilities/extractProps'

const mapStateToProps = (state, { resource }) => {
  const formName = `${resource}Create`

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
  formName: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  renderCreateForm: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resource: PropTypes.string.isRequired,
  startSubmit: PropTypes.func.isRequired,
  stopSubmit: PropTypes.func.isRequired,
  transformOutput: PropTypes.func,
  values: PropTypes.object,
}
const defaultProps = {
  transformOutput: undefined,
  values: undefined,
}

const rows = [
  {
    key: 'itemCreateForm',
    style: { overflow: 'auto' },
  },
  {
    height: emToPixels(4.625),
    key: 'bottomBar',
  },
]

class CreateItemColumn extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUndoChanges = this.handleUndoChanges.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  handleClose(event) {
    event.preventDefault()
    this.props.onInteraction(CLOSE_ITEM_VIEW)
  }

  handleSubmit(event) {
    event.preventDefault()

    const {
      dispatch,
      formName,
      onInteraction,
      resource,
      startSubmit,
      stopSubmit,
      transformOutput,
      values,
    } = this.props

    startSubmit(formName) // needed for withUnsavedChangesConfirmation

    const create =
      crudActionCreators[resource] && crudActionCreators[resource].create

    return dispatch(
      create({
        item: transformOutput ? transformOutput(values) : values,
        nested: true,
      })
    ).then(({ id }) => {
      onInteraction(CREATE_SUCCESS, { itemId: id })
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
      case 'itemCreateForm': {
        const { availableHeight, renderCreateForm } = this.props
        return renderCreateForm({ availableHeight })
      }
      case 'bottomBar': {
        const { extractedProps } = extractProps({
          keys: ['formName'],
          props: this.props,
        })

        return (
          <RecordActionBar
            {...extractedProps}
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
    const { availableHeight } = this.props

    return (
      <RowLayout
        availableHeight={availableHeight}
        renderRow={this.renderRow}
        rows={rows}
      />
    )
  }
}

CreateItemColumn.propTypes = propTypes
CreateItemColumn.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  connect(null) // needed to get dispatch
)(CreateItemColumn)
