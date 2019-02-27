const ensureNoCircularAncestorsPreHook = require('../../../../../lib/data/hooks/sharedHooks/ensureNoCircularAncestorsPreHook')

exports.updateRelationshipParent = [ensureNoCircularAncestorsPreHook]
