const {
  ensureNoCircularAncestorsPreHook,
} = require('../../../../../lib/data/hooks')

exports.updateRelationshipParent = [ensureNoCircularAncestorsPreHook]
