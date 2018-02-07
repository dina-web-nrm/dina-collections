import { BOOTSTRAP_REGISTER_MODULES } from '../actionTypes'

export default function registerModules({ config, modules }) {
  return {
    payload: { config, modules },
    type: BOOTSTRAP_REGISTER_MODULES,
  }
}
