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
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  isLatestActiveField: PropTypes.bool.isRequired,
  setAsLatestActiveField: PropTypes.func.isRequired,
}
const defaultProps = {
  buttonText: undefined,
}

const DefaultRenderEmptyState = props => {
  const {
    buttonText,
    isLatestActiveField,
    input: { name },
    setAsLatestActiveField,
  } = props

  const { extractedProps } = extractProps({
    keys: Object.keys(fieldTemplateProps),
    props,
  })

  return (
    <FieldTemplate {...extractedProps} name={name}>
      <div style={{ position: 'relative' }}>
        <Button
          onClick={isLatestActiveField ? undefined : setAsLatestActiveField}
        >
          {buttonText || (
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
