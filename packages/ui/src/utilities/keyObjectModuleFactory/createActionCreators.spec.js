import {
  createDelActionCreator,
  createSetActionCreator,
} from './createActionCreators'

describe('utilities/keyObjectModuleFactory/createActionCreators', () => {
  describe('createDelActionCreator', () => {
    it('is a function', () => {
      expect(typeof createDelActionCreator).toBe('function')
    })
    it('handles simple example', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: 'search',
        parameters: [],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator()).toEqual({
        payload: { parameters: {} },
        type: 'SOME_ACTION',
      })
    })
    it('throws if getting argument when no params required', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: 'search',
        parameters: [],
      })
      expect(() => actionCreator({})).toThrow()
    })
    it('handles complex example', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator({ index: 'b', root: 'a' })).toEqual({
        payload: { parameters: { index: 'b', root: 'a' } },
        type: 'SOME_ACTION',
      })
    })
    it('throws if getting argument of wrong type', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(() => actionCreator('mistake')).toThrow()
    })
    it('throws if getting extra arguments', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(() =>
        actionCreator('mistake', { index: 'b', root: 'a' })
      ).toThrow()
    })
  })
  describe('createSetActionCreator', () => {
    it('is a function', () => {
      expect(typeof createSetActionCreator).toBe('function')
    })
    it('handles simple example', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: 'search',
        parameters: [],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator('test')).toEqual({
        payload: { parameters: {}, value: 'test' },
        type: 'SOME_ACTION',
      })
    })
    it('throws on incorrect number of args', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: 'search',
        parameters: [],
      })

      expect(() => actionCreator('a', {})).toThrow()
    })
    it('handles complex example', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator('test', { index: 'b', root: 'a' })).toEqual({
        payload: { parameters: { index: 'b', root: 'a' }, value: 'test' },
        type: 'SOME_ACTION',
      })
    })
    it('throws on incorrect number of args', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })

      expect(() => actionCreator('a')).toThrow()
    })
    it('throws on incorrect type of second arg', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })

      expect(() => actionCreator('a', 'shouldBeObject')).toThrow()
    })
  })
})
