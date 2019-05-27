import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import ReactRangeSlider from 'react-rangeslider'

import sizeSelectors from 'coreModules/size/globalSelectors'

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
  currentRowNumber: PropTypes.number,
  disableCreate: PropTypes.bool,
  disableRecordNavigation: PropTypes.bool,
  getHasNextRow: PropTypes.func,
  getHasPreviousRow: PropTypes.func,
  isLargeScreen: PropTypes.bool.isRequired,
  navigateCreate: PropTypes.func,
  numberOfListItems: PropTypes.number,
  onFocusNextRow: PropTypes.func,
  onFocusPreviousRow: PropTypes.func,
  onFocusRow: PropTypes.func,
  onShowAllRecords: PropTypes.func,
  showRecordInput: PropTypes.bool,
  showSlider: PropTypes.bool,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentRowNumber: undefined,
  disableCreate: false,
  disableRecordNavigation: false,
  getHasNextRow: undefined,
  getHasPreviousRow: undefined,
  navigateCreate: undefined,
  numberOfListItems: undefined,
  onFocusNextRow: undefined,
  onFocusPreviousRow: undefined,
  onFocusRow: undefined,
  onShowAllRecords: undefined,
  showRecordInput: true,
  showSlider: true,
  totalNumberOfRecords: undefined,
}

const RecordNavigationBar = ({
  currentRowNumber,
  disableCreate,
  disableRecordNavigation,
  getHasNextRow,
  getHasPreviousRow,
  isLargeScreen,
  navigateCreate,
  onFocusNextRow: handleSelectNextRecord,
  onFocusPreviousRow: handleSelectPreviousRecord,
  onFocusRow: handleFocusRow,
  onShowAllRecords: handleShowAllRecords,
  numberOfListItems,
  showRecordInput,
  showSlider,
  totalNumberOfRecords,
}) => {
  const [sliderRowNumber, setSliderRowNumber] = useState(null)
  const isShowingAll = numberOfListItems === totalNumberOfRecords

  let sliderValue
  if (disableRecordNavigation) {
    sliderValue = ''
  } else if (sliderRowNumber !== null) {
    sliderValue = sliderRowNumber
  } else {
    sliderValue = currentRowNumber || ''
  }

  return (
    <Grid padded textAlign="left" verticalAlign="middle">
      <Grid.Row className="left floated">
        <Grid.Column>
          <Button.Group>
            <Button
              disabled={disableRecordNavigation || !getHasPreviousRow()}
              icon
              onClick={handleSelectPreviousRecord}
            >
              <Icon name="chevron left" />
            </Button>
            <Button
              disabled={disableRecordNavigation || !getHasNextRow()}
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
              disabled={disableRecordNavigation || numberOfListItems === 0}
              fluid
              max={numberOfListItems}
              min={numberOfListItems && 1}
              onBlur={() => {
                setSliderRowNumber(null)
              }}
              onChange={event => {
                const { value } = event.target
                if (value) {
                  handleFocusRow(value)
                  setSliderRowNumber(null)
                } else {
                  setSliderRowNumber('')
                }
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
                  if (disableRecordNavigation) {
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
                  if (disableRecordNavigation) {
                    return
                  }
                  handleFocusRow(sliderRowNumber)
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
          {!disableRecordNavigation && (
            <div style={{ fontWeight: 700, width: '7.25em' }}>
              <span data-testid="numberOfListItems">{numberOfListItems}</span>{' '}
              records
            </div>
          )}
        </Grid.Column>
        <Grid.Column>
          {!disableRecordNavigation && (
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
            disabled={disableRecordNavigation || isShowingAll}
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
            disabled={disableCreate}
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

export default compose(connect(mapStateToProps))(RecordNavigationBar)
