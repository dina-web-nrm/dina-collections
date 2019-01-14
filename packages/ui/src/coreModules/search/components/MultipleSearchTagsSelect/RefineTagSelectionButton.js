import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import * as selectors from './selectors'

const propTypes = {
  onCloseRefine: PropTypes.func.isRequired,
  onOpenRefine: PropTypes.func.isRequired,
  reduxFormValues: PropTypes.object,
  refineOpen: PropTypes.bool,
}

const defaultProps = {
  reduxFormValues: {},
  refineOpen: false,
}

class RefineTagSelectionButton extends Component {
  render() {
    const {
      refineOpen,
      reduxFormValues,
      onCloseRefine,
      onOpenRefine,
    } = this.props

    const numberOfSearchResults = selectors.getNumberOfFreeTextSearchResults(
      reduxFormValues
    )
    const numberOfSelectedResults = selectors.getNumberOfSelectedFreeTextResults(
      reduxFormValues
    )

    return (
      <Button
        disabled={!numberOfSearchResults}
        onClick={refineOpen ? onCloseRefine : onOpenRefine}
        style={{
          paddingLeft: '0.5em',
          paddingRight: '0.5em',
          textAlign: 'left',
          width: '3.5em',
        }}
      >
        <Icon name="sliders" style={{ margin: '0px' }} />
        {!!numberOfSearchResults &&
          numberOfSearchResults !== numberOfSelectedResults && (
            <Icon
              name="check circle"
              style={{
                fontSize: '0.8em',
                margin: '0px',
                position: 'relative',
                top: '-0.25em',
              }}
            />
          )}
      </Button>
    )
  }
}

RefineTagSelectionButton.defaultProps = defaultProps
RefineTagSelectionButton.propTypes = propTypes

export default RefineTagSelectionButton
