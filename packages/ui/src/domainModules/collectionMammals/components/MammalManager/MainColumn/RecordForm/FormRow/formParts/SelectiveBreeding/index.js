import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { Radio } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  formatBooleanRadio,
  parseBooleanRadio,
} from 'coreModules/form/utilities'

import createLog from 'utilities/log'

const log = createLog(
  'modules:collectionMammals:MammalForm:OriginInformation:SelectiveBreeding'
)

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
}

class SelectiveBreeding extends Component {
  getRadioGroup() {
    const { i18n: { moduleTranslate } } = this.props

    return [
      {
        key: 'no',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.wildAnimal',
        }),
        value: 'false',
      },
      {
        key: 'yes',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.zooAnimal',
        }),
        value: 'true',
      },
    ]
  }

  handleChange(event, { value }) {
    this.props.input.onChange(parseBooleanRadio(value))
  }

  render() {
    const { label, input } = this.props

    log.render()
    return (
      <Grid.Column width={16}>
        <Radio
          format={formatBooleanRadio}
          input={input}
          label={<ModuleTranslate module="collectionMammals" textKey={label} />}
          parser={parseBooleanRadio}
          radioOptions={this.getRadioGroup()}
        />
      </Grid.Column>
    )
  }
}

SelectiveBreeding.propTypes = propTypes

export default compose(withI18n())(SelectiveBreeding)
