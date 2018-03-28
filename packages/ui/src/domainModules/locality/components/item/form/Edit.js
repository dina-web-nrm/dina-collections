import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import BaseForm from './Base'
import { createGetCuratedLocalityById } from '../../../higherOrderComponents'

const mapDispatchToProps = {
  updateCuratedLocality: updateCuratedLocalityAc,
}

const propTypes = {
  curatedLocality: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  updateCuratedLocality: PropTypes.func.isRequired,
}

const defaultProps = {
  curatedLocality: undefined,
}

export class Edit extends PureComponent {
  render() {
    const { curatedLocality, onInteraction, itemId } = this.props
    const initialValues = curatedLocality && {
      group: curatedLocality.group,
      name: curatedLocality.name,
      parent: curatedLocality.parent
        ? {
            id: curatedLocality.parent.id,
          }
        : {},
    }

    if (!initialValues) {
      return null
    }

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={initialValues}
        onInteraction={onInteraction}
        onSubmit={data => {
          this.props
            .updateCuratedLocality({
              curatedLocality: {
                id: itemId,
                ...data,
              },
            })
            .then(result => {
              onInteraction('edit-submit-success', {
                itemId: result.id,
              })
            })
        }}
      />
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export default compose(
  createGetCuratedLocalityById,
  connect(null, mapDispatchToProps)
)(Edit)
