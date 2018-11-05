export default function createSingleDate({ initiallyHidden, name } = {}) {
  return [
    {
      componentName: 'SingleDate',
      initiallyHidden,
      name,
      wrapInField: true,
    },
  ]
}
