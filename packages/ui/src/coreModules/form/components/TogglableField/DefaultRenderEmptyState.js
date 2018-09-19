import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import extractProps from 'utilities/extractProps'
import { ModuleTranslate } from 'coreModules/i18n/components'
import FieldTemplate, {
  propTypes as fieldTemplateProps,
} from '../FieldTemplate'

const propTypes = {
  buttonText: PropTypes.string,
  buttonTextKey: PropTypes.string,
  displayLabel: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  module: PropTypes.string,
  setAsLatestActiveField: PropTypes.func.isRequired,
}
const defaultProps = {
  buttonText: undefined,
  buttonTextKey: undefined,
  displayLabel: false,
  module: undefined,
}

const DefaultRenderEmptyState = props => {
  const {
    buttonText,
    buttonTextKey,
    displayLabel,
    isLatestActiveField,
    input: { name },
    module,
    setAsLatestActiveField,
  } = props

  const { extractedProps } = extractProps({
    keys: Object.keys(fieldTemplateProps),
    props,
  })

  const hasCustomText = buttonText || buttonTextKey

  return (
    <FieldTemplate
      {...extractedProps}
      displayLabel={displayLabel || !hasCustomText}
      name={name}
    >
      <div style={{ position: 'relative' }}>
        <Button
          onClick={isLatestActiveField ? undefined : setAsLatestActiveField}
        >
          {hasCustomText &&
            (buttonText || (
              <ModuleTranslate
                capitalize
                module={module}
                textKey={buttonTextKey}
              />
            ))}
          {!hasCustomText && (
            <ModuleTranslate capitalize module="form" textKey="clickToAdd" />
          )}
        </Button>
      </div>
    </FieldTemplate>
  )
}

DefaultRenderEmptyState.propTypes = propTypes
DefaultRenderEmptyState.defaultProps = defaultProps

export default DefaultRenderEmptyState
