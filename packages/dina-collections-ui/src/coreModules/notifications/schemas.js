import { COLLISION_STACK, COLLISION_REPLACE } from './constants'

export const notification = {
  additionalProperties: false,
  properties: {
    collision: { enum: [COLLISION_REPLACE, COLLISION_STACK], type: 'string' },
    component: { type: 'object' },
    componentProps: { type: 'object' },
    displayType: { type: 'string' },
    priority: { type: 'number' },
    ttl: { type: 'number' },
    type: { type: 'string' },
  },
  required: ['component', 'displayType', 'priority', 'type'],
}
