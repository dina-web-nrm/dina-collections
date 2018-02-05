import { BOOTSTRAP_UNREGISTER_MODULES } from '../actionTypes'

export default function unregisterModules({ modules }) {
  return {
    payload: { modules },
    type: BOOTSTRAP_UNREGISTER_MODULES,
  }
}
