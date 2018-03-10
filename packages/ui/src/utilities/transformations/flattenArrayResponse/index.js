import flattenObjectResponse from '../flattenObjectResponse'

export default function flattenArrayResponse(responseData = {}) {
  if (!responseData || !Array.isArray(responseData) || !responseData.length) {
    return []
  }

  return responseData.map(flattenObjectResponse)
}
