import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import formParts from 'coreModules/form/components/parts'

const { RadioBoolean } = formParts

const log = createLog(
  'modules:collectionMammals:MammalForm:OriginInformation:SelectiveBreeding'
)

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  label: PropTypes.string.isRequired,
}

class SelectiveBreeding extends Component {
  constructor(props) {
    super(props)

    const { i18n: { moduleTranslate } } = props

    this.radioOptions = [
      {
        key: 'false',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.wildAnimal',
        }),
        value: 'false',
      },
      {
        key: 'true',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.zooAnimal',
        }),
        value: 'true',
      },
    ]
  }

  render() {
    const { input, label } = this.props

    log.render()
    return (
      <RadioBoolean
        input={input}
        label={<ModuleTranslate module="collectionMammals" textKey={label} />}
        radioOptions={this.radioOptions}
      />
    )
  }
}

SelectiveBreeding.propTypes = propTypes

export default compose(withI18n())(SelectiveBreeding)
