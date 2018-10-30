import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'

import { getTimestampFromYMD } from 'common/es5/date'
import userSelectors from 'coreModules/user/globalSelectors'
import BaseForm from './Base'

const mapStateToProps = state => {
  return {
    username: userSelectors.getUserName(state),
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

    const dateInput = {
      day: now.date(),
      month: now.month() + 1,
      year: now.year(),
    }

    return (
      <BaseForm
        displayBackButton
        initialValues={{
          date: {
            dateType: 'single',
            endDate: {
              ...dateInput,
              interpretedTimestamp: getTimestampFromYMD({
                ...dateInput,
                isEndDate: true,
              }),
            },
            startDate: {
              ...dateInput,
              interpretedTimestamp: getTimestampFromYMD({
                ...dateInput,
                isStartDate: true,
              }),
            },
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
