import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { destroy } from 'redux-form'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'

import crudActionCreators from 'coreModules/crud/actionCreators'

import BaseForm, { FORM_NAME } from './BaseForm'

const mapDispatchToProps = {
  createTaxonName: crudActionCreators.taxonName.create,
  destroy,
}

const propTypes = {
  allTaxonNamesFetched: PropTypes.bool,
  createTaxonName: PropTypes.func.isRequired,
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

    return (
      <BaseForm
        {...rest}
        displayBackButton
        displayResetButton
        onClose={event => {
          event.preventDefault()
          onInteraction('FORM_CANCEL')
        }}
        onSubmit={data => {
          this.props
            .createTaxonName({
              item: data,
              nested: true,
            })
            .then(result => {
              onInteraction('FORM_CREATE_SUCCESS', {
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

export default compose(
  createEnsureAllItemsFetched({
    allFetchedKey: 'allTaxonNamesFetched',
    resource: 'taxonName',
  }),
  connect(null, mapDispatchToProps)
)(Create)
