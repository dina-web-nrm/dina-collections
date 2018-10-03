import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Icon } from 'semantic-ui-react'
import objectPath from 'object-path'

import config from 'config'
import extractProps from 'utilities/extractProps'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { FieldTemplate } from 'coreModules/form/components'
import { propTypes as fieldTemplateProps } from 'coreModules/form/components/FieldTemplate'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  focusOnMount: PropTypes.bool,
  forceRenderResult: PropTypes.bool,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool,
  normalizedAgent: PropTypes.shape({
    attributes: PropTypes.shape({
      fullName: PropTypes.string,
    }),
  }),
  removeForceRenderResult: PropTypes.func,
  setAsLatestActiveField: PropTypes.func,
  textOnly: PropTypes.bool,
}
const defaultProps = {
  focusOnMount: false,
  forceRenderResult: false,
  isLatestActiveField: false,
  normalizedAgent: undefined,
  removeForceRenderResult: undefined,
  setAsLatestActiveField: undefined,
  textOnly: false,
}

class AgentIdTextResult extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnMount && !config.isTest) {
      this.button.focus()
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.forceRenderResult &&
      prevProps.isLatestActiveField !== this.props.isLatestActiveField &&
      !this.props.isLatestActiveField
    ) {
      this.props.removeForceRenderResult()
    }
  }

  handleClick(event) {
    event.preventDefault()
    this.props.removeForceRenderResult()
    this.props.setAsLatestActiveField()
  }

  render() {
    const {
      i18n: { moduleTranslate },
      input: { name, value },
      normalizedAgent,
      textOnly,
    } = this.props

    const inputText = value && (value.textI || value.textV)

    const fullName = objectPath.get(normalizedAgent, 'attributes.fullName')

    const agentName = fullName || inputText

    const suffix =
      (inputText &&
        moduleTranslate({
          module: 'form',
          textKey: 'plainText',
        })) ||
      (fullName && moduleTranslate({ module: 'agent', textKey: 'agent' }))

    const { extractedProps } = extractProps({
      keys: Object.keys(fieldTemplateProps),
      props: this.props,
    })

    if (textOnly) {
      return <React.Fragment>{`${agentName} (${suffix})`}</React.Fragment>
    }

    return (
      <FieldTemplate {...extractedProps} name={name}>
        <div style={{ position: 'relative' }}>
          <strong>{agentName}</strong>
          {` (${suffix})`}
          <Button
            icon
            onClick={this.handleClick}
            ref={element => {
              this.button = element
            }}
            style={{ marginLeft: '5px' }}
          >
            <Icon name="edit" />
          </Button>
        </div>
      </FieldTemplate>
    )
  }
}

AgentIdTextResult.propTypes = propTypes
AgentIdTextResult.defaultProps = defaultProps

export default compose(
  withI18n(),
  createGetItemById({
    idPath: 'input.value.normalized.id',
    itemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  })
)(AgentIdTextResult)
