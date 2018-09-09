import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'

import extractProps from 'utilities/extractProps'
import FieldTemplate, {
  propTypes as fieldTemplateProps,
} from '../FieldTemplate'

const propTypes = {
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
  setAsLatestActiveField: PropTypes.func.isRequired,
}

const DefaultRenderResult = props => {
  const {
    isLatestActiveField,
    input: { name, value },
    setAsLatestActiveField,
  } = props

  const { extractedProps } = extractProps({
    keys: Object.keys(fieldTemplateProps),
    props,
  })

  return (
    <FieldTemplate {...extractedProps} name={name}>
      <div style={{ position: 'relative' }}>
        <strong>{value} </strong>
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

DefaultRenderResult.propTypes = propTypes

export default DefaultRenderResult
