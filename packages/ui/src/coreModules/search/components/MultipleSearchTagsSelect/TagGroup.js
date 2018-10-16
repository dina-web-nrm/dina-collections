import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header, Label } from 'semantic-ui-react'

const propTypes = {
  onDeselectAllForSearchQuery: PropTypes.func.isRequired,
  onSelectAllForSearchQuery: PropTypes.func.isRequired,
  onToggleTagSelected: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequire,
    })
  ).isRequired,
  searchQuery: PropTypes.string.isRequired,
}
const TagGroup = ({
  onToggleTagSelected: handleToggleTagSelected,
  onDeselectAllForSearchQuery: handleDeselectAllForSearchQuery,
  onSelectAllForSearchQuery: handleSelectAllForSearchQuery,
  searchQuery,
  results,
}) => {
  return (
    <Grid verticalAlign="middle">
      <Grid.Column width={16}>
        <Header size="medium">
          {searchQuery}
          <Button
            onClick={() => handleDeselectAllForSearchQuery(searchQuery)}
            style={{ marginLeft: '1em' }}
          >
            Deselect all
          </Button>
          <Button onClick={() => handleSelectAllForSearchQuery(searchQuery)}>
            Select all
          </Button>
        </Header>
      </Grid.Column>
      <Grid.Column width={16}>
        <Label.Group>
          {results.map(({ attributes, id, selected }) => {
            return (
              <Label
                as="a"
                color={selected ? 'green' : undefined}
                key={id}
                onClick={() => handleToggleTagSelected({ id, searchQuery })}
              >{`${attributes.tagValue} (${attributes.tagType}) ${
                attributes && attributes.count !== undefined
                  ? ` (${attributes.count})`
                  : ''
              }`}</Label>
            )
          })}
        </Label.Group>
      </Grid.Column>
    </Grid>
  )
}

TagGroup.propTypes = propTypes

export default TagGroup
