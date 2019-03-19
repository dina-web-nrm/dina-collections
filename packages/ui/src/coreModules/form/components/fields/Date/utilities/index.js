import { getEarliestTimestamp, getTimestampFromYMD } from 'common/es5/date'
import { LATEST, RANGE, SINGLE } from 'coreModules/form/constants'

export const isInt = value => {
  return (
    !Number.isNaN(value) &&
    Number.parseInt(Number(value), 10) == value && // eslint-disable-line eqeqeq
    !Number.isNaN(parseInt(value, 10))
  )
}

export const getRangeValue = ({
  currentRangeValue,
  dateType,
  updatedDatePartName,
  updatedDatePartValue,
}) => {
  let newValue
  if (dateType === LATEST && updatedDatePartName === 'endDate') {
    newValue = {
      dateType,
      endDate: updatedDatePartValue,
      startDate:
        updatedDatePartValue && Object.keys(updatedDatePartValue).length
          ? {
              interpretedTimestamp: getEarliestTimestamp(),
            }
          : {},
    }
  } else if (dateType === SINGLE && updatedDatePartName === 'startDate') {
    newValue = {
      dateType,
      endDate:
        updatedDatePartValue && Object.keys(updatedDatePartValue).length
          ? {
              ...updatedDatePartValue,
              interpretedTimestamp: getTimestampFromYMD({
                ...updatedDatePartValue,
                isEndDate: true,
                moveCurrentYearEndDateToNow: true,
              }),
            }
          : {},
      startDate: updatedDatePartValue,
    }
  } else {
    newValue = {
      ...currentRangeValue,
      dateType,
      [updatedDatePartName]: updatedDatePartValue,
    }
  }

  if (newValue.endDate && !Object.keys(newValue.endDate).length) {
    delete newValue.endDate
  }
  if (newValue.startDate && !Object.keys(newValue.startDate).length) {
    delete newValue.startDate
  }

  if (!newValue.endDate && !newValue.startDate) {
    return {}
  }
  return newValue
}

export const getRangeValueAfterDateTypeChange = ({
  currentRangeValue,
  nextDateType,
  previousDateType,
}) => {
  const updatedValue = { ...currentRangeValue, dateType: nextDateType }

  if (previousDateType === LATEST && nextDateType === RANGE) {
    // keep end date, but clear start date
    updatedValue.startDate = {}
  } else if (previousDateType === LATEST && nextDateType === SINGLE) {
    updatedValue.startDate = {}
    updatedValue.endDate = {}
  } else if (previousDateType === RANGE && nextDateType === LATEST) {
    if (
      currentRangeValue.endDate &&
      currentRangeValue.endDate.interpretedTimestamp
    ) {
      updatedValue.startDate = {
        interpretedTimestamp: getEarliestTimestamp(),
      }
    } else {
      updatedValue.endDate = {}
      updatedValue.startDate = {}
    }
  } else if (previousDateType === RANGE && nextDateType === SINGLE) {
    if (
      currentRangeValue.startDate &&
      currentRangeValue.startDate.interpretedTimestamp
    ) {
      updatedValue.endDate = {
        ...updatedValue.startDate,
        interpretedTimestamp: getTimestampFromYMD({
          ...updatedValue.startDate,
          isEndDate: true,
          moveCurrentYearEndDateToNow: true,
        }),
      }
    } else {
      updatedValue.endDate = {}
      updatedValue.startDate = {}
    }
  } else if (previousDateType === SINGLE && nextDateType === LATEST) {
    if (
      currentRangeValue.startDate &&
      currentRangeValue.startDate.interpretedTimestamp
    ) {
      updatedValue.endDate = {
        ...updatedValue.startDate,
        interpretedTimestamp: getTimestampFromYMD({
          ...updatedValue.startDate,
          isEndDate: true,
          moveCurrentYearEndDateToNow: true,
        }),
      }
      updatedValue.startDate = {
        interpretedTimestamp: getEarliestTimestamp(),
      }
    } else {
      updatedValue.startDate = {}
      updatedValue.endDate = {}
    }
  } else if (previousDateType === SINGLE && nextDateType === RANGE) {
    // noop
  }

  return updatedValue
}
