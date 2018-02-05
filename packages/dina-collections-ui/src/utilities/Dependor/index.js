/* eslint-disable no-console, class-methods-use-this */
export const PRIVATE_NAMESPACE = '_dependor'

const getKey = key => {
  return `${PRIVATE_NAMESPACE}-${key}`
}

const testing = process.env.NODE_ENV === 'test'

const Dependor = class Dependor {
  constructor(dependencies = {}) {
    const originalDependenciesKey = getKey('dependencies')
    this[originalDependenciesKey] = {
      ...dependencies,
    }

    Object.keys(dependencies).forEach(key => {
      if (this[key]) {
        throw new Error(`Cant add dependency ${key}. Already exists`)
      }
      this[key] = dependencies[key]
    })
  }

  add(dependencies) {
    Object.keys(dependencies).forEach(key => {
      if (this[key]) {
        throw new Error(`Cant add dependency ${key}. Already exists`)
      }
      this[key] = dependencies[key]
    })
  }
  mock() {
    console.error('not allowed to call reset outside test')
  }
  reset() {
    console.error('not allowed to call reset outside test')
  }
  freeze() {
    console.error('not allowed to call freeze outside test')
  }
}

export const createFreezeFunction = key => {
  return () => {
    throw new Error(
      `Function ${key} is frozen in dependor and should not be called`
    )
  }
}

const TestDependor = class TestDependor extends Dependor {
  freeze(keys) {
    const originalDependenciesKey = getKey('dependencies')
    const originalDependencies = this[originalDependenciesKey]
    const keysToFreeze = keys || Object.keys(originalDependencies)
    this.mock(
      keysToFreeze.reduce((obj, key) => {
        if (this[key] === originalDependencies[key]) {
          return {
            ...obj,
            [key]: createFreezeFunction(key),
          }
        }
        return obj
      }, {})
    )
  }
  mock(dependencies) {
    if (!testing) {
      throw new Error('Dependor _mock should only be used in testing')
    }
    Object.keys(dependencies).forEach(key => {
      if (!this[key]) {
        throw new Error(`Cant mock dependency ${key}. Dont exists`)
      }
      this[key] = dependencies[key]
    })
  }

  reset(keys) {
    if (!testing) {
      throw new Error('Dependor _reset should only be used in testing')
    }
    const originalDependenciesKey = getKey('dependencies')
    const originalDependencies = this[originalDependenciesKey]
    if (!keys) {
      return Object.keys(originalDependencies).forEach(key => {
        this[key] = originalDependencies[key]
      })
    }

    if (Array.isArray(keys)) {
      return keys.forEach(key => {
        if (!this[key]) {
          throw new Error(`Cant reset dependency ${key}. Dont exists`)
        }
        this[key] = originalDependencies[key]
      })
    }

    if (!this[keys]) {
      throw new Error(`Cant mock dependency ${keys}. Dont exists`)
    }
    this[keys] = originalDependencies[keys]
    return this[keys]
  }
}

export default (testing ? TestDependor : Dependor)
