import reduceFieldSpecsToNodeFieldNamesMap from './reduceFieldSpecsToNodeFieldNamesMap'

export default function reduceFieldSpecsToSectionFieldNamesMap(
  fieldSpecs,
  useBaseName
) {
  return reduceFieldSpecsToNodeFieldNamesMap(fieldSpecs, {
    bySection: true,
    useBaseName,
  })
}
