import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Header, Label } from 'semantic-ui-react'

const propTypes = {
  addTagTypeToText: PropTypes.bool.isRequired,
  fetchFreeTextTags: PropTypes.func.isRequired,
  matchingTags: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        count: PropTypes.number.isRequired,
        tagType: PropTypes.string.isRequired,
        tagValue: PropTypes.string.isRequired,
      }).isRequired,
      id: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  matchingTagsReachedLimit: PropTypes.bool.isRequired,
  onDeselectAllForSearchQuery: PropTypes.func.isRequired,
  onSelectAllForSearchQuery: PropTypes.func.isRequired,
  onToggleTagSelected: PropTypes.func.isRequired,
  searchOption: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  translateTagType: PropTypes.func.isRequired,
}
class TagGroup extends Component {
  componentDidMount() {
    if (!this.props.matchingTags.length) {
      this.props.fetchFreeTextTags(this.props.searchOption)
    }
  }
  render() {
    const {
      addTagTypeToText,
      matchingTags,
      matchingTagsReachedLimit,
      onDeselectAllForSearchQuery: handleDeselectAllForSearchQuery,
      onSelectAllForSearchQuery: handleSelectAllForSearchQuery,
      onToggleTagSelected: handleToggleTagSelected,
      searchOption,
      searchQuery,
      translateTagType,
    } = this.props
    const title = searchOption.text
    return (
      <Grid verticalAlign="middle">
        <Grid.Column width={16}>
          <Header size="medium">
            {title}
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
            {!matchingTagsReachedLimit &&
              matchingTags.map(({ attributes, id, selected }) => {
                const { tagType } = attributes
                const tagTypeText = addTagTypeToText
                  ? ` [${translateTagType(tagType)}] `
                  : ' '

                return (
                  <Label
                    as="a"
                    color={selected ? 'green' : undefined}
                    key={id}
                    onClick={() => handleToggleTagSelected({ id, searchQuery })}
                  >{`${attributes.tagValue}${tagTypeText}${
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
}

TagGroup.propTypes = propTypes

export default TagGroup
