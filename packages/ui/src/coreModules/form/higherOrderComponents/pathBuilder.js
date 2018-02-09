import React, { Component } from 'react'
import PropTypes from 'prop-types'

const contextTypes = {
  nodeType: PropTypes.string,
  path: PropTypes.string,
  translationPath: PropTypes.string,
}

const childContextTypes = {
  nodeType: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  translationPath: PropTypes.string.isRequired,
}

const propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
}

const defaultProps = {
  index: undefined,
  name: undefined,
}

export const buildPath = (
  { name, index, parentPath, nameLast = true } = {}
) => {
  const segments = []
  if (parentPath !== undefined && parentPath !== '') {
    segments.push(parentPath)
  }

  if (!nameLast) {
    if (name !== undefined) {
      segments.push(name)
    }
  }

  if (index !== undefined) {
    segments.push(index)
  }

  if (nameLast) {
    if (name !== undefined) {
      segments.push(name)
    }
  }

  return segments.join('.')
}

export const buildTranslationPath = ({ name, parentPath } = {}) => {
  return buildPath({ name, parentPath })
}

export default function pathBuilderFactory(
  { nodeType = 'OBJECT', name: nodeName } = {}
) {
  return function pathBuilder(ComposedComponent) {
    class PathBuilder extends Component {
      constructor(props, context) {
        super(props, context)
        const { path: parentPath, translationPath: parentTranslationPath } =
          context || {}

        const { index, name } = props

        this.name = name || nodeName

        this.path = buildPath({
          index,
          name: this.name,
          nameLast: false,
          parentPath,
        })
        this.translationPath = buildTranslationPath({
          name: this.name,
          parentPath: parentTranslationPath,
        })
        this.getPath = this.getPath.bind(this)
        this.getTranslationPath = this.getTranslationPath.bind(this)
      }

      getChildContext() {
        const { path, translationPath } = this

        return {
          nodeType,
          path,
          translationPath,
        }
      }

      getPath(fieldName) {
        return buildPath({
          name: fieldName,
          nameLast: true,
          parentPath: this.path,
        })
      }

      getTranslationPath(fieldName) {
        return buildTranslationPath({
          name: fieldName,
          nameLast: true,
          parentPath: this.translationPath,
        })
      }

      render() {
        return (
          <ComposedComponent
            getPath={this.getPath}
            getTranslationPath={this.getTranslationPath}
            {...this.props}
          />
        )
      }
    }

    PathBuilder.childContextTypes = childContextTypes
    PathBuilder.contextTypes = contextTypes
    PathBuilder.defaultProps = defaultProps
    PathBuilder.propTypes = propTypes

    return PathBuilder
  }
}
