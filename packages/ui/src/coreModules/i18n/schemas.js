const availableLanguages = ['en', 'sv']

export const config = {
  additionalProperties: false,
  properties: {
    availableLanguages: {
      items: [
        {
          enum: availableLanguages,
          type: 'string',
        },
      ],
      minItems: 1,
      type: 'array',
      uniqueItems: true,
    },
    defaultLanguage: {
      enum: availableLanguages,
      type: 'string',
    },
    language: {
      enum: availableLanguages,
      type: 'string',
    },
    translations: {
      type: 'object',
    },
  },
}
