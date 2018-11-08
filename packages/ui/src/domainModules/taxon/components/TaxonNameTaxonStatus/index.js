import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import objectPath from 'object-path'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    itemId: formValueSelector(state, 'id'),
  }
}

const propTypes = {
  acceptedTaxon: PropTypes.shape({
    acceptedTaxonName: PropTypes.shape({
      name: PropTypes.string.isRequired,
      rank: PropTypes.string.isRequired,
    }).isRequired,
  }),
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  taxonName: PropTypes.shape({
    acceptedToTaxon: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    synonymToTaxon: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
}
const defaultProps = {
  acceptedTaxon: undefined,
}

const TaxonNameTaxonStatus = ({
  acceptedTaxon,
  i18n: { moduleTranslate },
  taxonName,
}) => {
  if (objectPath.get(taxonName, 'acceptedToTaxon.id')) {
    const taxonId = objectPath.get(taxonName, 'acceptedToTaxon.id')
    const rankString = taxonName.rank && `(${taxonName.rank})`
    return (
      <React.Fragment>
        {`${moduleTranslate({
          capitalize: true,
          textKey: 'acceptedNameForTaxon',
        })} `}
        <Link
          to={`/app/taxa?filterColumn=&itemId=${taxonId}&mainColumn=edit`}
        >{`${taxonName.name} ${rankString}`}</Link>
      </React.Fragment>
    )
  }

  if (objectPath.get(taxonName, 'synonymToTaxon.id')) {
    const taxonId = objectPath.get(taxonName, 'synonymToTaxon.id')
    const acceptedTaxonName = objectPath.get(
      acceptedTaxon,
      'acceptedTaxonName.name'
    )
    const acceptedRank = objectPath.get(acceptedTaxon, 'acceptedTaxonName.rank')
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
  createGetNestedItemById({
    include: ['acceptedToTaxon', 'synonymToTaxon'],
    nestedItemKey: 'taxonName',
    relationships: ['acceptedToTaxon', 'synonymToTaxon'],
    resolveRelationships: ['taxon'],
    resource: 'taxonName',
  }),
  createGetNestedItemById({
    idPath: 'taxonName.synonymToTaxon.id',
    include: ['acceptedTaxonName'],
    nestedItemKey: 'acceptedTaxon',
    relationships: ['acceptedTaxonName'],
    resolveRelationships: ['taxonName'],
    resource: 'taxon',
  })
)(TaxonNameTaxonStatus)
