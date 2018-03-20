export default function transformDistinguishedUnits(distinguishedUnits = []) {
  const physicalUnits = distinguishedUnits.reduce((arr, { physicalUnit }) => {
    return [...arr, physicalUnit]
  }, [])

  return { distinguishedUnits, physicalUnits }
}
