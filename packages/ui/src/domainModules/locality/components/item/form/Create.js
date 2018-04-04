import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createCuratedLocality as createCuratedLocalityAc } from 'dataModules/localityService/actionCreators'
import {
  FORM_CANCEL,
  FORM_CREATE_SUCCESS,
} from 'domainModules/locality/interactions'

import BaseForm from './Base'

const mapDispatchToProps = {
  createCuratedLocality: createCuratedLocalityAc,
}

const propTypes = {
  createCuratedLocality: PropTypes.func.isRequired,
  onInteraction: PropTypes.func.isRequired,
}

export class Create extends PureComponent {
  render() {
    const { onInteraction, ...rest } = this.props
    return (
      <BaseForm
        displayBackButton
        displayResetButton
        onClose={event => {
          event.preventDefault()
          onInteraction(FORM_CANCEL)
        }}
        onSubmit={data => {
          this.props
            .createCuratedLocality({
              curatedLocality: data,
            })
            .then(result => {
              onInteraction(FORM_CREATE_SUCCESS, {
                itemId: result.id,
              })
            })
        }}
        {...rest}
      />
    )
  }
}

Create.propTypes = propTypes

export default compose(connect(null, mapDispatchToProps))(Create)
