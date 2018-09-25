import { getTimestampFromYMD } from 'common/es5/date'
import { LATEST, RANGE, SINGLE } from 'coreModules/form/constants'

export const getEarliestTimestamp = () => {
  return getTimestampFromYMD({
    day: 1,
    isStartDate: true,
    month: 1,
    year: 1600,
  })
}

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
  if (dateType === LATEST && updatedDatePartName === 'endDate') {
    return {
      dateType,
      endDate: updatedDatePartValue,
      startDate: {
        interpretedTimestamp: getEarliestTimestamp(),
      },
    }
  }

  if (dateType === SINGLE && updatedDatePartName === 'startDate') {
    return {
      dateType,
      endDate: {
        ...(updatedDatePartValue || {}),
        interpretedTimestamp: getTimestampFromYMD({
          ...(updatedDatePartValue || {}),
          isEndDate: true,
        }),
      },
      startDate: updatedDatePartValue,
    }
  }

  return {
    ...currentRangeValue,
    dateType,
    [updatedDatePartName]: updatedDatePartValue,
  }
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
        }),
      }
    } else {
      updatedValue.endDate = {}
      updatedValue.startDate = {}
    }
  } else if (previousDateType === SINGLE && nextDateType === LATEST) {
    updatedValue.endDate = {}
    updatedValue.startDate = {}
  } else if (previousDateType === SINGLE && nextDateType === RANGE) {
    // noop
  }

  return updatedValue
}
