import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import objectPath from 'object-path'

import extractProps from 'utilities/extractProps'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { FieldTemplate } from 'coreModules/form/components'
import { propTypes as fieldTemplateProps } from 'coreModules/form/components/FieldTemplate'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const mapStateToProps = state => {
  return {
    normalizedAgents: globalCrudSelectors.normalizedAgent.getItemsObject(state),
  }
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]).isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  normalizedAgent: PropTypes.shape({
    attributes: PropTypes.shape({
      fullName: PropTypes.string,
    }),
  }),
  setAsLatestActiveField: PropTypes.func.isRequired,
}
const defaultProps = {
  normalizedAgent: undefined,
}

const AgentIdTextResult = props => {
  const {
    i18n: { moduleTranslate },
    isLatestActiveField,
    input: { name, value },
    normalizedAgent,
    setAsLatestActiveField,
  } = props

  const inputText = value && (value.textI || value.textT)

  const text =
    inputText && `${inputText} (${moduleTranslate({ textKey: 'plainText' })})`

  const result = objectPath.get(normalizedAgent, 'attributes.fullName') || text

  const { extractedProps } = extractProps({
    keys: Object.keys(fieldTemplateProps),
    props,
  })

  return (
    <FieldTemplate {...extractedProps} name={name}>
      <div style={{ position: 'relative' }}>
        <strong>{result}</strong>
        <Button
          icon
          onClick={isLatestActiveField ? undefined : setAsLatestActiveField}
          style={{ marginLeft: '5px' }}
        >
          <Icon name="edit" />
        </Button>
      </div>
    </FieldTemplate>
  )
}

AgentIdTextResult.propTypes = propTypes
AgentIdTextResult.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'form' }),
  createGetItemById({
    idPath: 'input.value.normalized.id',
    itemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  }),
  connect(mapStateToProps)
)(AgentIdTextResult)
