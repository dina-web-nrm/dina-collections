const createDelActionCreators = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delActionCreators, key) => {
    const { actionType } = delActionTypes[key]

    return {
      ...delActionCreators,
      [key]: () => {
        return {
          type: actionType,
        }
      },
    }
  }, {})
}

const createIndexDelActionCreators = delActionTypes => {
  return Object.keys(delActionTypes).reduce((delActionCreators, key) => {
    const { actionType } = delActionTypes[key]

    return {
      ...delActionCreators,
      [key]: index => {
        if (index === undefined) {
          throw new Error('Have to provide index')
        }
        return {
          payload: {
            index,
          },
          type: actionType,
        }
      },
    }
  }, {})
}

const createIndexSetActionCreators = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setActionCreators, key) => {
    const { actionType } = setActionTypes[key]

    return {
      ...setActionCreators,
      [key]: (index, value) => {
        if (index === undefined) {
          throw new Error('Have to provide index')
        }
        return {
          payload: {
            index,
            value,
          },
          type: actionType,
        }
      },
    }
  }, {})
}

const createSetActionCreators = setActionTypes => {
  return Object.keys(setActionTypes).reduce((setActionCreators, key) => {
    const { actionType } = setActionTypes[key]

    return {
      ...setActionCreators,
      [key]: value => {
        return {
          payload: { value },
          type: actionType,
        }
      },
    }
  }, {})
}

export default function createActionCreators(keyMap) {
  return {
    del: createDelActionCreators(keyMap.del),
    indexDel: createIndexDelActionCreators(keyMap.indexDel),
    indexSet: createIndexSetActionCreators(keyMap.indexSet),
    set: createSetActionCreators(keyMap.set),
  }
}
