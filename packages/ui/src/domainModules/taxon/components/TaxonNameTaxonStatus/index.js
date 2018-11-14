import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import objectPath from 'object-path'

import { createGetNestedItemById } from 'coreModules/crud/higherOrderComponents'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  nestedTaxonName: PropTypes.shape({
    acceptedToTaxon: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    synonymToTaxon: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  synonymToAcceptedTaxonName: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
  }),
}
const defaultProps = {
  synonymToAcceptedTaxonName: undefined,
}

const TaxonNameTaxonStatus = ({
  i18n: { moduleTranslate },
  nestedTaxonName,
  synonymToAcceptedTaxonName,
}) => {
  const acceptedToTaxonId = objectPath.get(
    nestedTaxonName,
    'acceptedToTaxon.id'
  )

  if (acceptedToTaxonId) {
    const { name, rank } = nestedTaxonName
    const rankString = rank ? ` (${rank})` : ''

    return (
      <React.Fragment>
        {`${moduleTranslate({
          capitalize: true,
          textKey: 'acceptedNameForTaxon',
        })} `}
        <Link
          to={`/app/taxa?filterColumn=&itemId=${
            acceptedToTaxonId
          }&mainColumn=edit`}
        >{`${name}${rankString}`}</Link>
      </React.Fragment>
    )
  }

  const synonymToTaxonId = objectPath.get(nestedTaxonName, 'synonymToTaxon.id')

  if (synonymToTaxonId) {
    const acceptedTaxonName = objectPath.get(
      synonymToAcceptedTaxonName,
      'acceptedTaxonName.name'
    )
    const acceptedTaxonNameRank = objectPath.get(
      synonymToAcceptedTaxonName,
      'acceptedTaxonName.rank'
    )
    const rankString = acceptedTaxonNameRank
      ? ` (${acceptedTaxonNameRank})`
      : ''

    return (
      <React.Fragment>
        {`${moduleTranslate({
          capitalize: true,
          textKey: 'synonymForTaxon',
        })} `}
        <Link
          to={`/app/taxa?filterColumn=&itemId=${
            synonymToTaxonId
          }&mainColumn=edit`}
        >{`${acceptedTaxonName}${rankString}`}</Link>
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
  createGetNestedItemById({
    idPath: 'nestedTaxonName.synonymToTaxon.id',
    include: ['acceptedTaxonName'],
    nestedItemKey: 'synonymToAcceptedTaxonName',
    relationships: ['acceptedTaxonName'],
    resolveRelationships: ['taxonName'],
    resource: 'taxon',
  })
)(TaxonNameTaxonStatus)
