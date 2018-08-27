import { createSelector } from 'reselect'

import getSecondArgument from 'utilities/getSecondArgument'

export const getLocalState = state => state.form

export const getFormState = createSelector(
  state => state,
  getSecondArgument,
  (state, formName) => {
    return state[formName]
  }
)

// returns name of active field if any, else undefined
export const getFormActive = createSelector(getFormState, formState => {
  return formState.active
})
