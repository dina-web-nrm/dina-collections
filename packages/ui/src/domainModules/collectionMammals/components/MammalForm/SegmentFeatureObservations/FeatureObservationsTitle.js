import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { ModuleTranslate } from 'coreModules/i18n/components'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentFeatureObservations:FeatureObservationsTitle'
)

const propTypes = {
  headlineKey: PropTypes.string.isRequired,
}

function FeatureObservationsTitle({ headlineKey }) {
  log.render()
  return (
    <React.Fragment>
      <Icon name="dropdown" />
      <ModuleTranslate
        fallback={headlineKey}
        module="collectionMammals"
        scope="featureObservations"
        textKey={headlineKey}
      />
    </React.Fragment>
  )
}

FeatureObservationsTitle.propTypes = propTypes

export default FeatureObservationsTitle
