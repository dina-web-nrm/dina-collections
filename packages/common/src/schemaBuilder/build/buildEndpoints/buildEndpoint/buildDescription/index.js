module.exports = function buildDescription({
  description,
  inverseOperationId,
}) {
  if (!inverseOperationId) {
    return description
  }

  const inverseOperationIdNotice = `NOTE: Use endpoint with operationId "${inverseOperationId}" instead. This endpoint is not active.`

  return description
    ? `${inverseOperationIdNotice}\n\n${description}`
    : inverseOperationIdNotice
}
