import { Children, cloneElement, Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Mousetrap from 'mousetrap'

import createLog from 'utilities/log'

import globalSelectors from '../../globalSelectors'

import {
  registerKeyboardShortcut,
  unregisterKeyboardShortcut,
} from '../../actionCreators'

const log = createLog('modules:keyboardShortcuts:DisplayShortcuts')

const mapStateToProps = state => {
  return {
    layer: globalSelectors.getLayer(state),
  }
}

const mapDispatchToProps = {
  push,
  registerKeyboardShortcut,
  unregisterKeyboardShortcut,
}

const propTypes = {
  activeInLayer: PropTypes.string,
  children: PropTypes.node,
  layer: PropTypes.string,
  onPress: PropTypes.func,
  push: PropTypes.func.isRequired,
  registerKeyboardShortcut: PropTypes.func.isRequired,
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      activeInLayer: PropTypes.string,
      command: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      onPress: PropTypes.func,
    }).isRequired
  ).isRequired,
  unregisterKeyboardShortcut: PropTypes.func.isRequired,
}
const defaultProps = {
  activeInLayer: undefined,
  children: undefined,
  layer: undefined,
  onPress: undefined,
}

class KeyboardShortcuts extends Component {
  constructor(props) {
    super(props)
    this.getHandler = this.getHandler.bind(this)
    this.getParamsHandler = this.getParamsHandler.bind(this)
    this.registerKeyboardShortcut = this.registerKeyboardShortcut.bind(this)
    this.unregisterKeyboardShortcut = this.unregisterKeyboardShortcut.bind(this)
  }

  componentDidMount() {
    const { activeInLayer: generalActiveInLayer, shortcuts } = this.props

    if (!shortcuts || !shortcuts.length) {
      throw new Error('Missing shortcuts')
    }

    shortcuts.forEach(shortcut => {
      const { activeInLayer: specificActiveInLayer, command } = shortcut
      const activeInLayer = specificActiveInLayer || generalActiveInLayer
      if (Array.isArray(command)) {
        return command.forEach(cmd => {
          this.registerKeyboardShortcut({
            ...shortcut,
            activeInLayer,
            command: cmd,
          })
        })
      }

      return this.registerKeyboardShortcut({ activeInLayer, ...shortcut })
    })
  }

  componentWillUnmount() {
    const { shortcuts } = this.props

    shortcuts.forEach(shortcut => {
      const { command } = shortcut
      return this.unregisterKeyboardShortcut(command)
    })
  }

  getHandler(shortcut) {
    const {
      activeInLayer: generalActiveInLayer,
      onPress: onPressSwitch,
    } = this.props

    const { activeInLayer: specificActiveInLayer, onPress } = shortcut

    const activeInLayer = specificActiveInLayer || generalActiveInLayer

    const handler = onPress || onPressSwitch || this.getParamsHandler(shortcut)

    if (!activeInLayer) {
      return handler
    }

    return (...args) => {
      const { layer } = this.props
      if (layer !== activeInLayer) {
        return null
      }
      return handler(...args)
    }
  }

  getParamsHandler({ command, params, type }) {
    switch (type) {
      case 'push': {
        return () => this.props.push(params.path)
      }

      default: {
        // prettier-ignore
        console.error( // eslint-disable-line no-console
          `Missing params handler for keyboard shortcut: ${command}`
        )
        return () => {}
      }
    }
  }

  registerKeyboardShortcut(shortcut) {
    const { command } = shortcut
    Mousetrap.bind(command, this.getHandler(shortcut))
    this.props.registerKeyboardShortcut(shortcut)
  }

  unregisterKeyboardShortcut(command) {
    Mousetrap.unbind(command)
    this.props.unregisterKeyboardShortcut(command)
  }

  render() {
    log.render()

    if (!this.props.children) {
      return null
    }

    const propsToForward = { ...this.props }

    Object.keys(propTypes).forEach(key => {
      delete propsToForward[key]
    })

    return Children.map(this.props.children, child =>
      cloneElement(child, propsToForward)
    )
  }
}

KeyboardShortcuts.propTypes = propTypes
KeyboardShortcuts.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardShortcuts)
