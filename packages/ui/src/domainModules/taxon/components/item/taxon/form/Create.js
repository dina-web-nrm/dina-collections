import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import { FORM_CANCEL, SET_ITEM_EDIT } from 'coreModules/crudBlocks/constants'

import BaseForm, { FORM_NAME } from './Base'

const mapDispatchToProps = {
  destroy,
}

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  createTaxon: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,

  itemId: PropTypes.string,
  onInteraction: PropTypes.func.isRequired,
}
const defaultProps = {
  allTaxonNamesFetched: undefined,
  itemId: undefined,
}

export class Create extends PureComponent {
  componentWillMount() {
    // necessary to ensure form is emptied if coming from an edit form with
    // other pre-filled values
    this.props.destroy([FORM_NAME])
  }

  render() {
    const { allTaxonNamesFetched, itemId, onInteraction, ...rest } = this.props

    if (!allTaxonNamesFetched) {
      return null
    }

    const initialValues = itemId && { parentId: itemId }

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onSubmit={data => {
          this.props
            .createTaxon({
              taxon: data,
            })
            .then(result => {
              onInteraction(SET_ITEM_EDIT, {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Create.propTypes = propTypes
Create.defaultProps = defaultProps

export default compose(connect(null, mapDispatchToProps))(Create)
