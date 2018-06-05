import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'

import { FORM_CANCEL, SET_ITEM_EDIT } from 'coreModules/crudBlocks/constants'
import crudActionCreators from 'coreModules/crud/actionCreators'

import BaseForm, { FORM_NAME } from './Base'

const mapDispatchToProps = {
  createTaxon: crudActionCreators.taxon.create,
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
    const { itemId, onInteraction, ...rest } = this.props

    const initialValues = itemId && { parent: { id: itemId } }

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
        onSubmit={formOutput => {
          this.props
            .createTaxon({
              item: formOutput,
              nested: true,
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
