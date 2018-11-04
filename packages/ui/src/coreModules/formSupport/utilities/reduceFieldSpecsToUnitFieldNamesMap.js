import reduceFieldSpecsToNodeFieldNamesMap from './reduceFieldSpecsToNodeFieldNamesMap'

export default function reduceFieldSpecsToUnitFieldNamesMap(
  fieldSpecs,
  useBaseName
) {
  return reduceFieldSpecsToNodeFieldNamesMap(fieldSpecs, {
    byUnit: true,
    useBaseName,
  })
}
