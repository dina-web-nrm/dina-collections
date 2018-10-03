import reduceFieldSpecsToNodeFieldNamesMap from './reduceFieldSpecsToNodeFieldNamesMap'

export default function reduceFieldSpecsToUnitFieldNamesMap(fieldSpecs) {
  return reduceFieldSpecsToNodeFieldNamesMap(fieldSpecs, { byUnit: true })
}
