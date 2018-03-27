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
      expect(() => actionCreator('a')).toThrow()
    })
    it('handles complex example', () => {
      const actionCreator = createDelActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator('a', 'b')).toEqual({
        payload: { parameters: { index: 'b', root: 'a' } },
        type: 'SOME_ACTION',
      })

      expect(() => actionCreator('a')).toThrow()
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
      expect(() => actionCreator('a', 'test')).toThrow()
    })
    it('handles complex example', () => {
      const actionCreator = createSetActionCreator({
        actionType: 'SOME_ACTION',
        key: ':root.object.:index.value',
        parameters: ['root', 'index'],
      })
      expect(typeof actionCreator).toBe('function')
      expect(actionCreator('a', 'b', 'test')).toEqual({
        payload: { parameters: { index: 'b', root: 'a' }, value: 'test' },
        type: 'SOME_ACTION',
      })

      expect(() => actionCreator('a', 'test')).toThrow()
    })
  })
})
