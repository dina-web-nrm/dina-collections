import React from 'react'
import PropTypes from 'prop-types'

import RelationTable from './RelationTable'

const propTypes = {
  childrenItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }).isRequired
  ),
  onRowClick: PropTypes.func.isRequired,
  parentItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
  }),
}

const defaultProps = {
  childrenItems: undefined,
  parentItem: undefined,
}

const ParentChildTables = ({ childrenItems, onRowClick, parentItem }) => {
  return (
    <React.Fragment>
      <h2>Belongs to</h2>
      <RelationTable
        onRowClick={onRowClick}
        rowItems={parentItem ? [parentItem] : undefined}
      />

      <h2>Contains</h2>
      <RelationTable
        onRowClick={onRowClick}
        rowItems={childrenItems || undefined}
      />
    </React.Fragment>
  )
}

ParentChildTables.propTypes = propTypes
ParentChildTables.defaultProps = defaultProps

export default ParentChildTables
