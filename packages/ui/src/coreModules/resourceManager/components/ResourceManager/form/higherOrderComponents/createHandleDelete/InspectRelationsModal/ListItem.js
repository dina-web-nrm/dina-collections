import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, List } from 'semantic-ui-react'

import { createGetItemById } from 'coreModules/crud/higherOrderComponents'

const getHref = ({ id, resource }) => {
  switch (resource) {
    case 'normalizedAgent': {
      return `/app/agents?itemId=${id}&mainColumn=edit`
    }
    case 'place': {
      return `/app/localities?itemId=${id}&mainColumn=edit`
    }
    case 'specimen': {
      return `/app/specimens/mammals/${id}/edit/sections/0`
    }
    case 'storageLocation': {
      return `/app/storageLocations?itemId=${id}&mainColumn=edit`
    }
    case 'taxon': {
      return `/app/taxa?itemId=${id}&mainColumn=edit`
    }
    case 'taxonName': {
      return `/app/taxonNames?itemId=${id}&mainColumn=edit`
    }
    default: {
      throw new Error(`Unknown resource: ${resource}`)
    }
  }
}

const propTypes = {
  id: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
}

const ListItem = ({ id, resource }) => {
  return (
    <List.Item
      as="a"
      href={getHref({ id, resource })}
      rel="noopener noreferrer"
      target="_blank"
    >
      <List.Content floated="left">{id}</List.Content>
      <List.Content floated="right">
        <Button icon="external alternate" />
      </List.Content>
    </List.Item>
  )
}

ListItem.propTypes = propTypes

export default compose(
  createGetItemById({
    idPath: 'id',
    refresh: false,
    shouldFetch: false,
  })
)(ListItem)
