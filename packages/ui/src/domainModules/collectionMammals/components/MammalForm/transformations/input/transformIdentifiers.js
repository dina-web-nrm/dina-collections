const INITIAL_VALUES = {
  identifiers: [
    {
      identifierType: {
        id: '1',
      },
      nameSpace: '',
      publishRecord: false,
      remarks: '',
      value: '',
    },
  ],
}

export default function transformIdentifiers(identifiers) {
  if (!identifiers) {
    return INITIAL_VALUES.identifiers
  }

  return identifiers
}
