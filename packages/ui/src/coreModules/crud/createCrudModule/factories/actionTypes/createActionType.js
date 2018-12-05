import { camelCaseToUpperSnakeCase } from 'common/es5/stringFormatters'

export default function createActionType({
  apiActionType = '',
  operationType = '',
  resource = '',
}) {
  return [
    camelCaseToUpperSnakeCase(operationType),
    camelCaseToUpperSnakeCase(resource),
    apiActionType.toUpperCase(),
  ].join('_')
}
