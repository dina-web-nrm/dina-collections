const createActionTypes = ({ actionPrefix, actionVerb, index, keys }) => {
  return keys
    .filter(key => {
      const isIndexParameter = key.indexOf(':') > -1
      return index === isIndexParameter
    })
    .reduce((setActionTypes, key) => {
      const cleanKey = key.replace(':', '')
      return {
        ...setActionTypes,
        [cleanKey]: {
          actionType: `${actionPrefix}_${actionVerb}_${cleanKey.toUpperCase()}`,
          cleanKey,
          key,
        },
      }
    }, {})
}

export default function createKeyMap({ actionPrefix, keys }) {
  return {
    del: createActionTypes({
      actionPrefix,
      actionVerb: 'DEL',
      index: false,
      keys,
    }),
    indexDel: createActionTypes({
      actionPrefix,
      actionVerb: 'INDEX_DEL',
      index: true,
      keys,
    }),
    indexSet: createActionTypes({
      actionPrefix,
      actionVerb: 'INDEX_SET',
      index: true,
      keys,
    }),
    set: createActionTypes({
      actionPrefix,
      actionVerb: 'SET',
      index: false,
      keys,
    }),
  }
}
