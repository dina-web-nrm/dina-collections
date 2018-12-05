import { camelCaseToUpperSnakeCase } from 'common/es5/stringFormatters'

export default function createSetIncludedActionType({ resource = '' }) {
  return ['SET_INCLUDED', camelCaseToUpperSnakeCase(resource)].join('_')
}
