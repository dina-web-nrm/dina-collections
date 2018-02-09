/* eslint-disable no-console, prefer-destructuring */
import React from 'react'
import PropTypes from 'prop-types'
import setupTestComponent from 'utilities/test/setupTestComponent'
import pathBuilder, { buildPath } from './pathBuilder'

describe('coreModules/form/higherOrderComponents/pathBuilder', () => {
  describe('buildPath', () => {
    it('dont throw when called without arguments', () => {
      buildPath()
    })
    it('return name if only provided', () => {
      expect(buildPath({ name: 'test' })).toBe('test')
    })
    it('prepend parentPath if provided', () => {
      expect(buildPath({ name: 'test', parentPath: 'parent' })).toBe(
        'parent.test'
      )
    })
    it('prepend index if provided', () => {
      expect(buildPath({ index: 1, name: 'test' })).toBe('1.test')
    })
    it('prepend parentPath and index if provided', () => {
      expect(buildPath({ index: 1, name: 'test', parentPath: 'parent' })).toBe(
        'parent.1.test'
      )
    })
    it('prepend parentPath and index if index is 0', () => {
      expect(buildPath({ index: 0, name: 'test', parentPath: 'parent' })).toBe(
        'parent.0.test'
      )
    })
  })

  it('renders without crashing', () => {
    const ExampleComponent = () => <div />

    const ComposedComponent = pathBuilder()(ExampleComponent)

    setupTestComponent({
      component: <ComposedComponent />,
      mount: true,
    })
  })

  describe('getPath', () => {
    it('injects getPath method', () => {
      const ExampleComponent = ({ getPath }) => {
        if (!getPath) {
          throw new Error('Expected getPath')
        }
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
    })

    it('returns empty string if no path context or params provided', () => {
      let callResult
      const ExampleComponent = ({ getPath }) => {
        callResult = getPath()
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
      expect(callResult).toBe('')
    })

    it('returns fieldName input if no path context', () => {
      let callResult
      const ExampleComponent = ({ getPath }) => {
        callResult = getPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
      expect(callResult).toBe('fieldName')
    })

    it('returns fieldName input scoped if scope provided', () => {
      let callResult
      const ExampleComponent = ({ getPath }) => {
        callResult = getPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent name="test" />,
        mount: true,
      })
      expect(callResult).toBe('test.fieldName')
    })

    it('returns fieldName input scoped if index provided', () => {
      let callResult
      const ExampleComponent = ({ getPath }) => {
        callResult = getPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent index={1} />,
        mount: true,
      })
      expect(callResult).toBe('1.fieldName')
    })

    it('returns fieldName input scoped including parent scopes', () => {
      let callResult
      const ExampleComponent = ({ getPath }) => {
        callResult = getPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      const ExampleWrapper = ({ children }) => {
        return <div>{children}</div>
      }

      ExampleWrapper.propTypes = {
        children: PropTypes.node.isRequired,
      }

      const ComposedWrapper = pathBuilder()(ExampleWrapper)

      setupTestComponent({
        component: (
          <ComposedWrapper name="parent">
            <ComposedComponent name="child" />{' '}
          </ComposedWrapper>
        ),
        mount: true,
      })

      expect(callResult).toBe('parent.child.fieldName')
    })
  })
  describe('getPathTranslationPath', () => {
    it('injects getTranslationPath method', () => {
      const ExampleComponent = ({ getTranslationPath }) => {
        if (!getTranslationPath) {
          throw new Error('Expected getTranslationPath')
        }
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
    })

    it('returns empty string if no path context or params provided', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath()
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
      expect(callResult).toBe('')
    })

    it('returns fieldName input if no path context', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
      expect(callResult).toBe('fieldName')
    })

    it('returns fieldName input scoped if scope provided', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent name="test" />,
        mount: true,
      })
      expect(callResult).toBe('test.fieldName')
    })

    it('returns fieldName input scoped if scope provided at setup', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder({ name: 'test' })(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent />,
        mount: true,
      })
      expect(callResult).toBe('test.fieldName')
    })

    it('returns fieldName input scoped by prop and not name provided at bootstrap', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder({ name: 'test' })(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent name="test2" />,
        mount: true,
      })
      expect(callResult).toBe('test2.fieldName')
    })

    it('returns fieldName input ignoring index if index provided', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      setupTestComponent({
        component: <ComposedComponent index={1} />,
        mount: true,
      })
      expect(callResult).toBe('fieldName')
    })

    it('returns fieldName input scoped including parent scopes', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      const ExampleWrapper = ({ children }) => {
        return <div>{children}</div>
      }

      ExampleWrapper.propTypes = {
        children: PropTypes.node.isRequired,
      }

      const ComposedWrapper = pathBuilder()(ExampleWrapper)

      setupTestComponent({
        component: (
          <ComposedWrapper name="parent">
            <ComposedComponent name="child" />{' '}
          </ComposedWrapper>
        ),
        mount: true,
      })

      expect(callResult).toBe('parent.child.fieldName')
    })
    it('returns fieldName input scoped ignoring index if provided', () => {
      let callResult
      const ExampleComponent = ({ getTranslationPath }) => {
        callResult = getTranslationPath('fieldName')
        return <div />
      }

      ExampleComponent.propTypes = {
        getTranslationPath: PropTypes.func.isRequired,
      }

      const ComposedComponent = pathBuilder()(ExampleComponent)

      const ExampleWrapper = ({ children }) => {
        return <div>{children}</div>
      }

      ExampleWrapper.propTypes = {
        children: PropTypes.node.isRequired,
      }

      const ComposedWrapper = pathBuilder()(ExampleWrapper)

      setupTestComponent({
        component: (
          <ComposedWrapper name="parent">
            <ComposedComponent index={1} />{' '}
          </ComposedWrapper>
        ),
        mount: true,
      })

      expect(callResult).toBe('parent.fieldName')
    })
  })
})
