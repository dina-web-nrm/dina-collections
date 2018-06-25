import React from 'react'
import PropTypes from 'prop-types'
import { Header, Modal } from 'semantic-ui-react'

import TagGroup from './TagGroup'

const propTypes = {
  inline: PropTypes.bool.isRequired,
  numberOfSearchResults: PropTypes.number.isRequired,
  numberOfSelectedResults: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeselectAllForSearchQuery: PropTypes.func.isRequired,
  onSelectAllForSearchQuery: PropTypes.func.isRequired,
  onToggleTagSelected: PropTypes.func.isRequired,
  searchQueryResultsMap: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequire,
      })
    ).isRequired
  ).isRequired,
}

const RefineTagSelection = ({
  inline,
  numberOfSearchResults,
  numberOfSelectedResults,
  onClose: handleClose,
  onToggleTagSelected: handleToggleTagSelected,
  searchQueryResultsMap,
  onDeselectAllForSearchQuery: handleDeselectAllForSearchQuery,
  onSelectAllForSearchQuery: handleSelectAllForSearchQuery,
}) => {
  if (inline) {
    return (
      <React.Fragment>
        <Header size="medium">{`Refine filter (${numberOfSelectedResults}/${
          numberOfSearchResults
        })`}</Header>
        {Object.keys(searchQueryResultsMap).map(searchQuery => {
          return (
            <TagGroup
              key={searchQuery}
              onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
              onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
              onToggleTagSelected={handleToggleTagSelected}
              results={searchQueryResultsMap[searchQuery]}
              searchQuery={searchQuery}
            />
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <Modal closeIcon onClose={handleClose} open>
      <Modal.Header>{`Refine filter (${numberOfSelectedResults}/${
        numberOfSearchResults
      })`}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {Object.keys(searchQueryResultsMap).map(searchQuery => {
            return (
              <TagGroup
                key={searchQuery}
                onDeselectAllForSearchQuery={handleDeselectAllForSearchQuery}
                onSelectAllForSearchQuery={handleSelectAllForSearchQuery}
                onToggleTagSelected={handleToggleTagSelected}
                results={searchQueryResultsMap[searchQuery]}
                searchQuery={searchQuery}
              />
            )
          })}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

RefineTagSelection.propTypes = propTypes

export default RefineTagSelection
