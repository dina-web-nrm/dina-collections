import { SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE } from './constants'

const sizeEnum = [SIZE_SMALL, SIZE_MEDIUM, SIZE_LARGE]

export const config = {
  additionalProperties: false,
  properties: {
    breakpoints: {
      items: {
        additionalProperties: false,
        properties: {
          maxWidth: {
            type: 'number',
          },
          size: {
            enum: sizeEnum,
            type: 'string',
          },
        },
        required: ['size'],
        type: 'object',
      },
      maxItems: 3,
      minItems: 3,
      type: 'array',
      uniqueItems: true,
    },
    currentBreakpoint: {
      additionalProperties: false,
      properties: {
        size: {
          enum: sizeEnum,
          type: 'string',
        },
      },
      required: ['size'],
      type: 'object',
    },
  },
  required: ['breakpoints'],
}
