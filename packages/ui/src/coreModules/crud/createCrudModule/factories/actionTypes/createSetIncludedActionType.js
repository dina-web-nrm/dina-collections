import { camelCaseToUpperSnakeCase } from 'common/src/stringFormatters'

export default function createSetIncludedActionType({ resource = '' }) {
  return ['SET_INCLUDED', camelCaseToUpperSnakeCase(resource)].join('_')
}
