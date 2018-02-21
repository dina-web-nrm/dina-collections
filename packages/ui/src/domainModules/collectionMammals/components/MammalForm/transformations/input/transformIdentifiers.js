const INITIAL_VALUES = {
  identifiers: [
    {
      identifier: {
        identifierType: 'catalogNumber',
        nameSpace: '',
        value: '',
      },
      publishRecord: false,
      remarks: '',
    },
  ],
}

export default function transformIdentifiers(identifiers) {
  if (!identifiers) {
    return INITIAL_VALUES.identifiers
  }

  return identifiers
}
