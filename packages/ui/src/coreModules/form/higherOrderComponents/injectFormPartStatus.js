import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import createLog from 'utilities/log'
import {
  buildInitialFormPartStatus,
  createUpdateFormPartStatus,
} from '../utilities'

const log = createLog(
  'coreModules:form:higherOrderComponents:injectFormPartStatus'
)

const propTypes = {
  childSpecs: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }).isRequired
    ),
  }),
  name: PropTypes.string,
  setChildDirty: PropTypes.func,
  setChildInvalid: PropTypes.func,
}

const defaultProps = {
  childSpecs: undefined,
  name: undefined,
  setChildDirty: undefined,
  setChildInvalid: undefined,
}

const injectFormPartStatus = ({ childSpecs, name } = {}) => {
  return ComposedComponent => {
    class FormPartStatusInjector extends PureComponent {
      constructor(props) {
        super(props)

        this.name = props.name || name
        this.childSpecs = props.childSpecs || childSpecs

        if (!this.name) {
          throw new Error('Must provide name when initializing HOC or as prop')
        }

        if (!this.childSpecs || !this.childSpecs.items) {
          throw new Error(
            `Must provide childSpecs.items when initializing HOC or as prop in form part ${
              this.name
            }`
          )
        }

        this.state = {
          // prettier-ignore
          childStatuses: buildInitialFormPartStatus( // eslint-disable-line react/no-unused-state
            this.childSpecs.items,
            this.name
          ),
          dirty: false,
          invalid: false,
        }

        this.updateDirtyState = createUpdateFormPartStatus({
          callback: props.setChildDirty,
          name: this.name,
          propName: 'dirty',
        })
        this.updateInvalidState = createUpdateFormPartStatus({
          callback: props.setChildInvalid,
          name: this.name,
          propName: 'invalid',
        })

        this.setChildDirty = this.setChildDirty.bind(this)
        this.setChildInvalid = this.setChildInvalid.bind(this)
      }

      setChildDirty(childName, value) {
        log.debug(`${this.name} setChildDirty ${childName}:`, value)
        this.setState(prevState =>
          this.updateDirtyState({
            childName,
            prevState,
            value,
          })
        )
      }

      setChildInvalid(childName, value) {
        log.debug(`${this.name} setChildInvalid ${childName}:`, value)
        this.setState(prevState =>
          this.updateInvalidState({
            childName,
            prevState,
            value,
          })
        )
      }

      render() {
        log.render()

        const { dirty, invalid } = this.state

        log.debug(`${this.name} dirty:`, dirty)
        log.debug(`${this.name} invalid:`, invalid)

        return (
          <ComposedComponent
            {...this.props}
            dirty={dirty}
            invalid={invalid}
            setChildDirty={this.setChildDirty}
            setChildInvalid={this.setChildInvalid}
          />
        )
      }
    }

    FormPartStatusInjector.propTypes = propTypes
    FormPartStatusInjector.defaultProps = defaultProps

    return FormPartStatusInjector
  }
}

export default injectFormPartStatus
