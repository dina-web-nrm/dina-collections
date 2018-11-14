import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import objectPath from 'object-path'

import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    acceptedToTaxonId: formValueSelector(state, 'acceptedToTaxon.id'),
    itemId: formValueSelector(state, 'id'),
    synonymToTaxonId: formValueSelector(state, 'synonymToTaxon.id'),
  }
}

const propTypes = {
  acceptedToTaxon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
  }),
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  synonymToTaxon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
  }),
}
const defaultProps = {
  acceptedToTaxon: undefined,
  synonymToTaxon: undefined,
}

const TaxonNameTaxonStatus = ({
  acceptedToTaxon,
  i18n: { moduleTranslate },
  synonymToTaxon,
}) => {
  if (objectPath.get(acceptedToTaxon, 'id')) {
    const taxonId = objectPath.get(acceptedToTaxon, 'id')
    const acceptedTaxonName = objectPath.get(acceptedToTaxon, 'attributes.name')
    const acceptedRank = objectPath.get(acceptedToTaxon, 'attributes.rank')
    const rankString = acceptedRank && `(${acceptedRank})`
    return (
      <React.Fragment>
        {`${moduleTranslate({
          capitalize: true,
          textKey: 'acceptedNameForTaxon',
        })} `}
        <Link
          to={`/app/taxa?filterColumn=&itemId=${taxonId}&mainColumn=edit`}
        >{`${acceptedTaxonName} ${rankString}`}</Link>
      </React.Fragment>
    )
  }

  if (objectPath.get(synonymToTaxon, 'id')) {
    const taxonId = objectPath.get(synonymToTaxon, 'id')
    const acceptedTaxonName = objectPath.get(synonymToTaxon, 'attributes.name')
    const acceptedRank = objectPath.get(synonymToTaxon, 'attributes.rank')
    const rankString = acceptedRank && `(${acceptedRank})`

    return (
      <React.Fragment>
        {`${moduleTranslate({
          capitalize: true,
          textKey: 'synonymForTaxon',
        })} `}
        <Link
          to={`/app/taxa?filterColumn=&itemId=${taxonId}&mainColumn=edit`}
        >{`${acceptedTaxonName} ${rankString}`}</Link>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      {moduleTranslate({
        capitalize: true,
        textKey: 'notAssociatedWithTaxon',
      })}
    </React.Fragment>
  )
}

TaxonNameTaxonStatus.propTypes = propTypes
TaxonNameTaxonStatus.defaultProps = defaultProps

export default compose(
  withI18n({ module: 'taxon' }),
  connect(mapStateToProps),
  createGetItemById({
    idPath: 'synonymToTaxonId',
    itemKey: 'synonymToTaxon',
    resource: 'taxonName',
  }),
  createGetItemById({
    idPath: 'acceptedToTaxonId',
    itemKey: 'acceptedToTaxon',
    resource: 'taxonName',
  })
)(TaxonNameTaxonStatus)
