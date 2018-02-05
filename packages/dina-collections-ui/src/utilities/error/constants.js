const ERROR_CODES = {
  DEFAULT_API_ERROR: 'DEFAULT_API_ERROR',
  DEFAULT_SYSTEM: 'DEFAULT_SYSTEM',
  FORM_VALIDATION_ERROR: 'FORM_VALIDATION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
}

const ORIGINS = {
  CLIENT: 'client',
  SERVER: 'server',
}

const TYPES = {
  API: 'api',
  FORM: 'form',
  SYSTEM: 'system',
  TYPE: 'user',
}

const JSON_SCHEMA_ERROR_CODES = {
  additionalProperties: 'ADDITIONAL_PROPERTIES',
  maxLength: 'MAX_LENGTH',
  minLength: 'MIN_LENGTH',
  required: 'REQUIRED',
  type: 'WRONG_TYPE',
}

module.exports = {
  ERROR_CODES,
  JSON_SCHEMA_ERROR_CODES,
  ORIGINS,
  TYPES,
}
