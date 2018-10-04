import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import Slider from 'react-rangeslider'

import sizeSelectors from 'coreModules/size/globalSelectors'

const mapStateToProps = state => {
  return {
    isLargeScreen: sizeSelectors.getIsLarge(state),
  }
}

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSetCurrentTableRowNumber: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  onShowAllRecords: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onToggleFilters: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  showNewRecordButton: PropTypes.bool,
  showRecordInput: PropTypes.bool,
  showShowAllButton: PropTypes.bool,
  showSlider: PropTypes.bool,
  showTotalRecords: PropTypes.bool,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  showNewRecordButton: true,
  showRecordInput: true,
  showShowAllButton: true,
  showSlider: true,
  showTotalRecords: true,
  totalNumberOfRecords: undefined,
}

export class RecordNavigationBar extends Component {
  constructor(props) {
    super(props)
    this.state = { sliderRowNumber: null }
  }

  render() {
    const {
      currentTableRowNumber,
      isLargeScreen,
      onOpenNewRecordForm: handleOpenNewRecordForm,
      onSelectNextRecord: handleSelectNextRecord,
      onSelectPreviousRecord: handleSelectPreviousRecord,
      onSetCurrentTableRowNumber: handleSetCurrentTableRowNumber,
      onShowAllRecords: handleShowAllRecords,
      onToggleFilters: handleToggleFilters,
      showNewRecordButton,
      showRecordInput,
      showShowAllButton,
      showTotalRecords,
      showSlider,
      totalNumberOfRecords,
    } = this.props

    const { sliderRowNumber } = this.state

    return (
      <Grid padded textAlign="center" verticalAlign="middle">
        <Grid.Column>
          <div style={{ float: 'left' }}>
            <Button.Group>
              <Button
                disabled={!handleSelectPreviousRecord}
                icon
                onClick={event => handleSelectPreviousRecord(event)}
              >
                <Icon name="chevron left" />
              </Button>
              <Button
                disabled={!handleSelectNextRecord}
                icon
                onClick={event => handleSelectNextRecord(event)}
              >
                <Icon name="chevron right" />
              </Button>
            </Button.Group>
          </div>
          {showRecordInput && (
            <div style={{ float: 'left', marginLeft: 15, marginTop: 1 }}>
              <Input
                disabled={!handleSetCurrentTableRowNumber}
                max={totalNumberOfRecords}
                min={totalNumberOfRecords && 1}
                onChange={event => {
                  handleSetCurrentTableRowNumber(null, event.target.value)
                }}
                size="mini"
                style={{ width: '80px' }}
                type="number"
                value={sliderRowNumber || currentTableRowNumber}
              />
            </div>
          )}

          {isLargeScreen &&
            showSlider && (
              <div
                className="slider-slim"
                style={{
                  float: 'left',
                  marginLeft: 15,
                  marginTop: 11,
                  width: 150,
                }}
              >
                <Slider
                  max={totalNumberOfRecords}
                  min={totalNumberOfRecords && 1}
                  onChange={newTableRowNumber => {
                    // those ifs are a needed hack to avoid double increment when
                    // using hotkey directly after sliding
                    if (newTableRowNumber === currentTableRowNumber + 1) {
                      this.setState({ sliderRowNumber: newTableRowNumber - 1 })
                    } else if (
                      newTableRowNumber ===
                      currentTableRowNumber - 1
                    ) {
                      this.setState({ sliderRowNumber: newTableRowNumber + 1 })
                    } else {
                      this.setState({ sliderRowNumber: newTableRowNumber })
                    }
                  }}
                  onChangeComplete={() => {
                    handleSetCurrentTableRowNumber(null, sliderRowNumber)
                    this.setState({ sliderRowNumber: null })
                  }}
                  step={1}
                  tooltip={false}
                  value={sliderRowNumber || currentTableRowNumber}
                />
              </div>
            )}
          {showTotalRecords &&
            (handleOpenNewRecordForm ? (
              <div style={{ float: 'left', marginLeft: 15, marginTop: 5 }}>
                {totalNumberOfRecords} total records
              </div>
            ) : (
              <div style={{ float: 'left', marginLeft: 15, marginTop: -3 }}>
                {totalNumberOfRecords} total records
                <br />
                <i>*Adding new*</i>
              </div>
            ))}
          <div style={{ float: 'left', marginLeft: 15 }}>
            {showShowAllButton && (
              <Button
                disabled={!handleShowAllRecords}
                icon
                onClick={event => handleShowAllRecords(event)}
                size="tiny"
              >
                <Icon name="book" />
                {' Show All'}
              </Button>
            )}

            {showNewRecordButton && (
              <Button
                disabled={!handleOpenNewRecordForm}
                icon
                onClick={event => handleOpenNewRecordForm(event)}
                size="tiny"
              >
                <Icon name="plus" />
                {' New record'}
              </Button>
            )}
          </div>
          <div style={{ float: 'right' }}>
            <Button
              disabled={!handleToggleFilters}
              icon
              onClick={event => handleToggleFilters(event)}
            >
              <Icon name="search" />
              Find
            </Button>
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

RecordNavigationBar.propTypes = propTypes
RecordNavigationBar.defaultProps = defaultProps

export default connect(mapStateToProps)(RecordNavigationBar)
