import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import userSelectors from 'coreModules/user/globalSelectors'
import BaseForm from './Base'

const mapStateToProps = state => {
  return {
    username: userSelectors.getUsername(state),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string,
}
const defaultProps = {
  username: undefined,
}

export class CreateCuratorialAssessment extends PureComponent {
  render() {
    const {
      changeFieldValue,
      fieldName,
      onClose: handleClose,
      username,
      ...rest
    } = this.props

    const now = moment()

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={{
          agent: { textI: username },
          date: {
            day: now.date(),
            month: now.month(),
            year: now.year(),
          },
          isInStorage: true,
        }}
        onClose={event => {
          event.preventDefault()
          handleClose()
        }}
        onSubmit={data => {
          changeFieldValue(fieldName, data)
          handleClose()
        }}
        {...rest}
      />
    )
  }
}

CreateCuratorialAssessment.propTypes = propTypes
CreateCuratorialAssessment.defaultProps = defaultProps

export default connect(mapStateToProps)(CreateCuratorialAssessment)
