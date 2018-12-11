import React, { Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { Radio } from 'coreModules/form/components'
import { wrapInColumn } from 'coreModules/form/higherOrderComponents'

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
        key: 'no',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.wildAnimal',
        }),
        value: 'no',
      },
      {
        key: 'yes',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.zooAnimal',
        }),
        value: 'yes',
      },
      {
        key: 'unknown',
        text: moduleTranslate({
          capitalize: true,
          module: 'collectionMammals',
          textKey: 'other.unknown',
        }),
        value: 'unknown',
      },
    ]
  }

  render() {
    const { input, label } = this.props

    log.render()
    return (
      <Radio
        input={input}
        label={<ModuleTranslate module="collectionMammals" textKey={label} />}
        radioOptions={this.radioOptions}
      />
    )
  }
}

SelectiveBreeding.propTypes = propTypes
export default compose(withI18n(), wrapInColumn)(SelectiveBreeding)
