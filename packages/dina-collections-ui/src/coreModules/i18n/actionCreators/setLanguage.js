import { I18N_SET_LANGUAGE } from '../actionTypes'

export default function setLanguage(language) {
  return {
    payload: language,
    type: I18N_SET_LANGUAGE,
  }
}
