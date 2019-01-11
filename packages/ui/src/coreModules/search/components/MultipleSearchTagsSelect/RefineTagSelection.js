import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Header } from 'semantic-ui-react'
import { FormModal } from '../../../form/components'
import TagGroup from './TagGroup'
import * as selectors from './selectors'

const propTypes = {
  addTagTypeToText: PropTypes.bool.isRequired,
  inline: PropTypes.bool.isRequired,
  numberOfSearchResults: PropTypes.number.isRequired,
  numberOfSelectedResults: PropTypes.number.isRequired,
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
}

const defaultProps = {
  reduxFormValues: {},
}

const RefineTagSelection = ({
  addTagTypeToText,
  inline,
  numberOfSearchResults,
  numberOfSelectedResults,
  onClose: handleClose,
  onDeselectAllForSearchQuery: handleDeselectAllForSearchQuery,
  onSelectAllForSearchQuery: handleSelectAllForSearchQuery,
  onToggleTagSelected: handleToggleTagSelected,
  reduxFormValues,
}) => {
  const freeTextQueries = selectors.getAllFreeTextQueries(reduxFormValues)
  if (inline) {
    return (
      <React.Fragment>
        <Header size="medium">{`Refine filter (${numberOfSelectedResults}/${
          numberOfSearchResults
        })`}</Header>
        {freeTextQueries.map(searchQuery => {
          return (
            <TagGroup
              addTagTypeToText={addTagTypeToText}
              key={searchQuery}
              onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
              onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
              onToggleTagSelected={handleToggleTagSelected}
              results={reduxFormValues[searchQuery].matchingTags}
              searchQuery={searchQuery}
            />
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <FormModal closeIcon onClose={handleClose} open>
      <Modal.Header>{`Refine filter (${numberOfSelectedResults}/${
        numberOfSearchResults
      })`}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {freeTextQueries.map(searchQuery => {
            return (
              <TagGroup
                addTagTypeToText={addTagTypeToText}
                key={searchQuery}
                onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
                onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
                onToggleTagSelected={handleToggleTagSelected}
                results={reduxFormValues[searchQuery].matchingTags}
                searchQuery={searchQuery}
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
