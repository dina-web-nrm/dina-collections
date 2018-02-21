import transformDeterminations from './transformDeterminations'

const INITIAL_VALUES = {
  assignedTaxon: { determinations: [{}] },
}

export default function transformAssignedTaxon(assignedTaxon) {
  if (!assignedTaxon) {
    return INITIAL_VALUES.assignedTaxon
  }

  return {
    ...assignedTaxon,
    determinations: transformDeterminations(assignedTaxon.determinations),
  }
}
