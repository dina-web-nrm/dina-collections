import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { updateCuratedLocality as updateCuratedLocalityAc } from 'domainModules/localityService/actionCreators'
import BaseForm from './Base'

const mapStateToProps = (state, ownProps) => {
  const { itemId } = ownProps
  return {
    curatedLocality: localityServiceSelectors.getCuratedLocality(state, itemId),
  }
}

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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Edit)
