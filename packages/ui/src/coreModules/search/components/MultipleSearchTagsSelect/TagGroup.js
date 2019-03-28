import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Icon, Header, Label } from 'semantic-ui-react'

const computeNumberOfSelected = matchingTags => {
  return matchingTags.reduce((numberOfMatches, tag) => {
    if (tag.selected) {
      return numberOfMatches + 1
    }
    return numberOfMatches
  }, 0)
}

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
    const numberOfTagsSelected = computeNumberOfSelected(matchingTags)
    const hasTagsSelected = numberOfTagsSelected > 0
    const noTagsSelected = numberOfTagsSelected === 0

    let message = ''
    if (matchingTagsReachedLimit) {
      message = ' More than 50 matches (all will be used).'
    } else if (noTagsSelected) {
      message = ' No matches selected (all will be used).'
    } else {
      message = ''
    }

    const title = `Q: ${searchOption.text}`
    return (
      <Grid verticalAlign="middle">
        <Grid.Column width={16}>
          <Header size="medium">
            {title}
            {message && (
              <Label
                basic
                style={{
                  border: 0,
                  marginLeft: 0,
                }}
              >
                {message}
              </Label>
            )}

            {hasTagsSelected && (
              <Label
                as="a"
                basic
                color="green"
                onClick={() => handleDeselectAllForSearchQuery(searchQuery)}
                style={{ border: 0, marginLeft: 0 }}
              >
                {`${numberOfTagsSelected} selected`}{' '}
                <Icon name="delete" style={{ opacity: 1 }} />
              </Label>
            )}
            {!matchingTagsReachedLimit && (
              <Label
                as="a"
                basic
                onClick={() => handleSelectAllForSearchQuery(searchQuery)}
              >
                Select all matches
              </Label>
            )}
          </Header>

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
                  >{`${attributes.tagText}${tagTypeText}${
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
