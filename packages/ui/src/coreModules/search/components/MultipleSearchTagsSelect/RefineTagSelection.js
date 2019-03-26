import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Header } from 'semantic-ui-react'
import { FormModal } from '../../../form/components'
import TagGroup from './TagGroup'
import * as selectors from './selectors'

const propTypes = {
  addTagTypeToText: PropTypes.bool.isRequired,
  fetchFreeTextTags: PropTypes.func.isRequired,
  inline: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeselectAllForSearchQuery: PropTypes.func.isRequired,
  onSelectAllForSearchQuery: PropTypes.func.isRequired,
  onToggleTagSelected: PropTypes.func.isRequired,
  reduxFormValues: PropTypes.objectOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      matchingTags: PropTypes.array.isRequired,
      searchOption: PropTypes.object.isRequired,
    }).isRequired
  ),
  translateTagType: PropTypes.func.isRequired,
}

const defaultProps = {
  reduxFormValues: {},
}

const RefineTagSelection = ({
  addTagTypeToText,
  fetchFreeTextTags,
  inline,
  onClose: handleClose,
  onDeselectAllForSearchQuery: handleDeselectAllForSearchQuery,
  onSelectAllForSearchQuery: handleSelectAllForSearchQuery,
  onToggleTagSelected: handleToggleTagSelected,
  reduxFormValues,
  translateTagType,
}) => {
  const freeTextQueries = selectors.getAllFreeTextQueries(reduxFormValues)
  if (inline) {
    return (
      <React.Fragment>
        <Header size="medium">Refine free text queries</Header>
        <p>Refine queries with up to 50 matching tags</p>
        {freeTextQueries.map(searchQuery => {
          const { matchingTagsReachedLimit, searchOption } = reduxFormValues[
            searchQuery
          ]

          return (
            <TagGroup
              addTagTypeToText={addTagTypeToText}
              fetchFreeTextTags={fetchFreeTextTags}
              key={searchQuery}
              matchingTags={reduxFormValues[searchQuery].matchingTags}
              matchingTagsReachedLimit={matchingTagsReachedLimit}
              onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
              onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
              onToggleTagSelected={handleToggleTagSelected}
              searchOption={searchOption}
              searchQuery={searchQuery}
              translateTagType={translateTagType}
            />
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <FormModal closeIcon onClose={handleClose} open>
      <Modal.Header>Refine free text queries</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <Header size="small">
            Refine queries with up to 50 matching tags
          </Header>
          {freeTextQueries.map(searchQuery => {
            const { matchingTagsReachedLimit, searchOption } = reduxFormValues[
              searchQuery
            ]
            return (
              <TagGroup
                addTagTypeToText={addTagTypeToText}
                fetchFreeTextTags={fetchFreeTextTags}
                key={searchQuery}
                matchingTags={reduxFormValues[searchQuery].matchingTags}
                matchingTagsReachedLimit={matchingTagsReachedLimit}
                onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
                onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
                onToggleTagSelected={handleToggleTagSelected}
                searchOption={searchOption}
                searchQuery={searchQuery}
                translateTagType={translateTagType}
              />
            )
          })}
        </Modal.Description>
      </Modal.Content>
    </FormModal>
  )
}

RefineTagSelection.propTypes = propTypes
RefineTagSelection.defaultProps = defaultProps

export default RefineTagSelection
