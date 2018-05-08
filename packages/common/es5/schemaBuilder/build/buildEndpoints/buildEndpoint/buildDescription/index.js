"use strict";

module.exports = function buildDescription(_ref) {
  var description = _ref.description,
      inverseOperationId = _ref.inverseOperationId;

  if (!inverseOperationId) {
    return description;
  }

  var inverseOperationIdNotice = "NOTE: Use endpoint with operationId \"" + inverseOperationId + "\" instead. This endpoint is not active.";

  return description ? inverseOperationIdNotice + "\n\n" + description : inverseOperationIdNotice;
};