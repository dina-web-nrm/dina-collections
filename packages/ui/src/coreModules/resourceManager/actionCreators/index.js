import { RESOURCE_MANAGER_CLOSE, RESOURCE_MANAGER_OPEN } from '../actionTypes'

export function open() {
  return {
    type: RESOURCE_MANAGER_OPEN,
  }
}

export function close() {
  return {
    type: RESOURCE_MANAGER_CLOSE,
  }
}
