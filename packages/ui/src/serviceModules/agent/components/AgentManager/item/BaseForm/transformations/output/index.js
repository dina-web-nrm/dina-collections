import objectPath from 'object-path'
import { isEmpty } from 'lodash'

export default function transformOutput(normalizedAgent) {
  const transformedNormalizedAgent = JSON.parse(JSON.stringify(normalizedAgent))

  const roles = objectPath.get(transformedNormalizedAgent, 'roles')
  if (roles && roles.length) {
    transformedNormalizedAgent.roles = roles
      .map(role => {
        const patchedRole = { ...role }
        delete patchedRole.key
        return patchedRole
      })
      .filter(role => !isEmpty(role))
  }
  return transformedNormalizedAgent
}
