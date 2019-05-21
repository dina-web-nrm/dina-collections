import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import ReactRangeSlider from 'react-rangeslider'

import sizeSelectors from 'coreModules/size/globalSelectors'
import { injectResourceManagerNavigation } from 'coreModules/resourceManager/higherOrderComponents'
import createTableModuleWrapper from '../../../../table/higherOrderComponents/createTableModuleWrapper'

/*
 * Override handleKeyDown to avoid conflict with other arrow KeyboardShortcuts
 * and fix this: https://github.com/whoisandy/react-rangeslider/pull/82
 */
class Slider extends ReactRangeSlider {
  constructor(props) {
    super(props)
    this.handleKeyDown = () => {}
  }
}

const mapStateToProps = state => {
  return {
    isLargeScreen: sizeSelectors.getIsLarge(state),
  }
}

const propTypes = {
  createItemActive: PropTypes.bool.isRequired,
  currentRowNumber: PropTypes.number,
  disabled: PropTypes.bool,
  editItemActive: PropTypes.bool.isRequired,
  fetchTableItems: PropTypes.func.isRequired,
  getHasNextRow: PropTypes.func.isRequired,
  getHasPreviousRow: PropTypes.func.isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
  navigateCreate: PropTypes.func.isRequired,
  numberOfListItems: PropTypes.number,
  onFocusNextRow: PropTypes.func.isRequired,
  onFocusPreviousRow: PropTypes.func.isRequired,
  onSetCurrentRowNumber: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onShowAllRecords: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  showRecordInput: PropTypes.bool,
  showSlider: PropTypes.bool,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentRowNumber: undefined,
  disabled: false,
  numberOfListItems: undefined,
  onSetCurrentRowNumber: false,
  onShowAllRecords: false,
  showRecordInput: true,
  showSlider: true,
  totalNumberOfRecords: undefined,
}

const RecordNavigationBar = ({
  createItemActive,
  currentRowNumber,
  disabled,
  editItemActive,
  fetchTableItems,
  getHasNextRow,
  getHasPreviousRow,
  isLargeScreen,
  navigateCreate,
  numberOfListItems,
  onFocusNextRow: handleSelectNextRecord,
  onFocusPreviousRow: handleSelectPreviousRecord,
  onSetCurrentRowNumber: handleSetCurrentRowNumber,
  onShowAllRecords: handleShowAllRecords,
  showRecordInput,
  showSlider,
  totalNumberOfRecords,
}) => {
  const [sliderRowNumber, setSliderRowNumber] = useState(null)

  const sliderValue = disabled ? '' : sliderRowNumber || currentRowNumber || ''
  const isShowingAll = numberOfListItems === totalNumberOfRecords

  // TODO: move this to hoc?
  useEffect(() => {
    if (createItemActive || editItemActive) {
      fetchTableItems()
    }
  }, [createItemActive, editItemActive, fetchTableItems])

  return (
    <Grid padded textAlign="left" verticalAlign="middle">
      <Grid.Row className="left floated">
        <Grid.Column>
          <Button.Group>
            <Button
              disabled={disabled || !getHasPreviousRow()}
              icon
              onClick={handleSelectPreviousRecord}
            >
              <Icon name="chevron left" />
            </Button>
            <Button
              disabled={disabled || !getHasNextRow()}
              icon
              onClick={handleSelectNextRecord}
            >
              <Icon name="chevron right" />
            </Button>
          </Button.Group>
        </Grid.Column>
        {showRecordInput && (
          <Grid.Column>
            <Input
              className="center aligned bold"
              data-testid="currentTableRowInput"
              disabled={disabled || numberOfListItems === 0}
              fluid
              max={numberOfListItems}
              min={numberOfListItems && 1}
              onChange={event => {
                handleSetCurrentRowNumber(event.target.value)
              }}
              size="small"
              style={{ width: '6.5em' }}
              type="number"
              value={sliderValue}
            />
          </Grid.Column>
        )}
        {isLargeScreen && showSlider && (
          <Grid.Column className="slider-slim">
            <div
              style={{
                width: '6.25em',
              }}
            >
              <Slider
                max={numberOfListItems}
                min={numberOfListItems && 1}
                onChange={newTableRowNumber => {
                  if (disabled) {
                    return
                  }
                  // those ifs are a needed hack to avoid double increment when
                  // using hotkey directly after sliding
                  if (newTableRowNumber === currentRowNumber + 1) {
                    setSliderRowNumber(newTableRowNumber - 1)
                  } else if (newTableRowNumber === currentRowNumber - 1) {
                    setSliderRowNumber(newTableRowNumber + 1)
                  } else {
                    setSliderRowNumber(newTableRowNumber)
                  }
                }}
                onChangeComplete={() => {
                  if (disabled) {
                    return
                  }
                  handleSetCurrentRowNumber(sliderRowNumber)
                  setSliderRowNumber(null)
                }}
                step={1}
                tooltip={false}
                value={sliderValue || 0}
              />
            </div>
          </Grid.Column>
        )}
        <Grid.Column>
          {!disabled && (
            <div style={{ fontWeight: 700, width: '7.25em' }}>
              <span data-testid="numberOfListItems">{numberOfListItems}</span>{' '}
              records
            </div>
          )}
        </Grid.Column>
        <Grid.Column>
          {!disabled && (
            <div
              style={{
                color: 'rgba(0,0,0,.6)',
                fontStyle: 'italic',
                width: '4.25em',
              }}
            >
              of {totalNumberOfRecords}
            </div>
          )}
        </Grid.Column>
        <Grid.Column>
          <Button
            basic
            disabled={disabled || isShowingAll}
            icon
            onClick={event => handleShowAllRecords(event)}
          >
            <div style={{ width: '6.5625em' }}>
              {isShowingAll ? 'Showing all' : 'Show all'}
            </div>
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button
            disabled={createItemActive}
            icon
            onClick={navigateCreate}
            primary
          >
            <div style={{ width: '7.5em' }}>
              <Icon name="plus" />
              New record
            </div>
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

RecordNavigationBar.propTypes = propTypes
RecordNavigationBar.defaultProps = defaultProps

export default compose(
  createTableModuleWrapper(),
  injectResourceManagerNavigation,
  connect(mapStateToProps)
)(RecordNavigationBar)
