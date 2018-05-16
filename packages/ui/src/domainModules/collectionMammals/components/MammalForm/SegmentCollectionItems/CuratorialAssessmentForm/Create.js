import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import userSelectors from 'coreModules/user/globalSelectors'
import BaseForm from './Base'

const mapStateToProps = state => {
  return {
    userName: userSelectors.getUserName(state),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  userName: PropTypes.string,
}
const defaultProps = {
  userName: undefined,
}

export class CreateCuratorialAssessment extends PureComponent {
  render() {
    const {
      changeFieldValue,
      fieldName,
      onClose: handleClose,
      userName,
      ...rest
    } = this.props

    return (
      <BaseForm
        displayBackButton
        displayResetButton
        initialValues={{
          agent: userName,
          date: {
            dateText: moment().format('YYYY-MM-DD'),
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
