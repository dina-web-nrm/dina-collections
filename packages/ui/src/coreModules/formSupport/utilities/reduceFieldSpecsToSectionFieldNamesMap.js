import reduceFieldSpecsToNodeFieldNamesMap from './reduceFieldSpecsToNodeFieldNamesMap'

export default function reduceFieldSpecsToSectionFieldNamesMap(fieldSpecs) {
  return reduceFieldSpecsToNodeFieldNamesMap(fieldSpecs, { bySection: true })
}
