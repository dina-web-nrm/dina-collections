export default function flattenObjectResponse(response) {
  if (!response || !response.data) {
    return response
  }

  const { id, attributes, relationships, type } = response.data

  return {
    ...attributes,
    id,
    relationships,
    type,
  }
}
