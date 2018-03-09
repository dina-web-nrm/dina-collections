import flattenObjectResponse from '../flattenObjectResponse'

export default function flattenArrayResponse(response = {}) {
  if (
    !response ||
    !response.data ||
    !Array.isArray(response.data) ||
    !response.data.length
  ) {
    return []
  }

  return response.data.map(resource =>
    flattenObjectResponse({ data: resource })
  )
}
