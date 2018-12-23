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
  currentTableRowNumber: PropTypes.number,
  isLargeScreen: PropTypes.bool.isRequired,
  numberOfListItems: PropTypes.number.isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onSetCurrentTableRowNumber: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  onShowAllRecords: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  showNewRecordButton: PropTypes.bool,
  showRecordInput: PropTypes.bool,
  showShowAllButton: PropTypes.bool,
  showSlider: PropTypes.bool,
  totalNumberOfRecords: PropTypes.number,
  treeActive: PropTypes.bool,
}
const defaultProps = {
  currentTableRowNumber: undefined,
  onOpenNewRecordForm: false,
  onSelectNextRecord: false,
  onSelectPreviousRecord: false,
  onSetCurrentTableRowNumber: false,
  onShowAllRecords: false,
  showNewRecordButton: true,
  showRecordInput: true,
  showShowAllButton: true,
  showSlider: true,
  totalNumberOfRecords: undefined,
  treeActive: false,
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
      numberOfListItems,
      onOpenNewRecordForm: handleOpenNewRecordForm,
      onSelectNextRecord: handleSelectNextRecord,
      onSelectPreviousRecord: handleSelectPreviousRecord,
      onSetCurrentTableRowNumber: handleSetCurrentTableRowNumber,
      onShowAllRecords: handleShowAllRecords,
      showNewRecordButton,
      showRecordInput,
      showShowAllButton,
      showSlider,
      treeActive,
      totalNumberOfRecords,
    } = this.props

    const { sliderRowNumber } = this.state
    const sliderValue =
      (handleSetCurrentTableRowNumber
        ? sliderRowNumber || currentTableRowNumber
        : currentTableRowNumber) || ''
    const isShowingAll =
      !handleShowAllRecords || numberOfListItems === totalNumberOfRecords

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
            <div
              style={{
                float: 'left',
                marginLeft: 15,
                marginTop: 1,
              }}
            >
              <Input
                className="center aligned bold"
                disabled={
                  !handleSetCurrentTableRowNumber || numberOfListItems === 0
                }
                fluid
                max={numberOfListItems}
                min={numberOfListItems && 1}
                onChange={event => {
                  handleSetCurrentTableRowNumber(null, event.target.value)
                }}
                size="small"
                style={{
                  width: '6.5em',
                }}
                type="number"
                value={sliderValue}
              />
            </div>
          )}

          {isLargeScreen &&
            showSlider && (
              <div
                className="slider-slim"
                style={{
                  float: 'left',
                  marginLeft: '0.625em',
                  marginTop: '0.9375em',
                  width: '6.25em',
                }}
              >
                <Slider
                  max={numberOfListItems}
                  min={numberOfListItems && 1}
                  onChange={newTableRowNumber => {
                    if (!handleSetCurrentTableRowNumber) {
                      return
                    }
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
                    if (!handleSetCurrentTableRowNumber) {
                      return
                    }
                    handleSetCurrentTableRowNumber(null, sliderRowNumber)
                    this.setState({ sliderRowNumber: null })
                  }}
                  step={1}
                  tooltip={false}
                  value={sliderRowNumber || currentTableRowNumber}
                />
              </div>
            )}
          <div
            style={{
              float: 'left',
              marginLeft: '0.625em',
              marginTop: '0.46875em',
              textAlign: 'left',
              width: '7.25em',
            }}
          >
            {!treeActive && (
              <React.Fragment>
                <span style={{ fontWeight: 700 }}>
                  {numberOfListItems} records
                </span>{' '}
              </React.Fragment>
            )}
          </div>
          <div
            style={{
              float: 'left',
              marginLeft: '0.625em',
              marginTop: '0.46875em',
              textAlign: 'left',
              width: '4.25em',
            }}
          >
            {!treeActive && (
              <React.Fragment>
                <span
                  style={{
                    color: 'rgba(0,0,0,.6)',
                    display: 'block',
                    float: 'right',
                    fontStyle: 'italic',
                  }}
                >
                  of {totalNumberOfRecords}
                </span>
              </React.Fragment>
            )}
          </div>
          <div
            style={{
              float: 'left',
              marginLeft: 15,
            }}
          >
            {showShowAllButton && (
              <Button
                basic
                disabled={isShowingAll}
                icon
                onClick={event => handleShowAllRecords(event)}
              >
                <div style={{ width: '6.5625em' }}>
                  {isShowingAll ? 'Showing all' : 'Show all'}
                </div>
              </Button>
            )}
          </div>
          <div style={{ float: 'left', marginLeft: 15 }}>
            {showNewRecordButton && (
              <Button
                disabled={!handleOpenNewRecordForm}
                icon
                onClick={event => handleOpenNewRecordForm(event)}
                primary
              >
                <div style={{ width: '7.5em' }}>
                  <Icon name="plus" />New record
                </div>
              </Button>
            )}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

RecordNavigationBar.propTypes = propTypes
RecordNavigationBar.defaultProps = defaultProps

export default connect(mapStateToProps)(RecordNavigationBar)
