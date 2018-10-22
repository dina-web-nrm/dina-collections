import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import crudActionCreators from 'coreModules/crud/actionCreators'
import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import BaseForm from './BaseForm'

const mapDispatchToProps = {
  updateTaxonName: crudActionCreators.place.update,
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  itemId: PropTypes.string.isRequired,
  nestedItem: PropTypes.object,
  onInteraction: PropTypes.func.isRequired,
  updateTaxonName: PropTypes.func.isRequired,
}

const defaultProps = {
  nestedItem: undefined,
}

export class Edit extends PureComponent {
  render() {
    const {
      i18n: { moduleTranslate },
      nestedItem: initialValues,
      onInteraction,
      itemId,
      ...rest
    } = this.props

    if (!initialValues) {
      return null
    }

    return (
      <React.Fragment>
        <BaseForm
          {...rest}
          displayBackButton
          displayResetButton
          form="taxonNameEdit"
          formSectionNavigationHeader={`${
            initialValues.name
          } (${moduleTranslate({ textKey: 'name' })})`}
          initialValues={initialValues}
          onClose={event => {
            event.preventDefault()
            onInteraction('FORM_CANCEL')
          }}
          onInteraction={onInteraction}
          onSubmit={formOutput => {
            this.props
              .updateTaxonName({
                item: {
                  id: itemId,
                  ...formOutput,
                },
                nested: true,
              })
              .then(result => {
                onInteraction('FORM_EDIT_SUCCESS', {
                  itemId: result.id,
                })
              })
          }}
        />
      </React.Fragment>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'taxon' }),
  createGetNestedItemById({
    nestedItemKey: 'taxonName',
    resource: 'taxonName',
  }),
  connect(null, mapDispatchToProps)
)(Edit)
