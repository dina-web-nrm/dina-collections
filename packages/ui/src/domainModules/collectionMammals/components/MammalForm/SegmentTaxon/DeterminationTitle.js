import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import taxonSelectors from 'dataModules/taxonService/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations:DeterminationTitle'
)

const mapStateToProps = (state, { taxon }) => {
  const taxonResource =
    taxon && taxon.id && taxonSelectors.getTaxon(state, taxon.id)

  return {
    taxonName: taxonResource && taxonResource.scientificName,
  }
}

const propTypes = {
  active: PropTypes.bool.isRequired,
  date: PropTypes.string,
  determinedByAgentText: PropTypes.string,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  isCurrentDetermination: PropTypes.bool,
  remarks: PropTypes.string,
  taxonName: PropTypes.string,
}
const defaultProps = {
  date: undefined,
  determinedByAgentText: undefined,
  isCurrentDetermination: undefined,
  remarks: undefined,
  taxonName: undefined,
}

function DeterminationContent({
  active,
  date,
  determinedByAgentText,
  i18n: { moduleTranslate },
  isCurrentDetermination,
  remarks,
  taxonName,
}) {
  const headline = [
    taxonName,
    determinedByAgentText,
    date,
    remarks,
    isCurrentDetermination &&
      moduleTranslate({ textKey: 'isCurrent' }).toLowerCase(),
  ]
    .filter(str => !!str)
    .join(', ')

  log.render()
  return (
    <React.Fragment>
      <Icon name="dropdown" />
      {!active && headline}
    </React.Fragment>
  )
}

DeterminationContent.propTypes = propTypes
DeterminationContent.defaultProps = defaultProps

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'determination',
  }),
  connect(mapStateToProps),
  pathBuilder({
    name: 'taxonInformation.determinations',
  })
)(DeterminationContent)
