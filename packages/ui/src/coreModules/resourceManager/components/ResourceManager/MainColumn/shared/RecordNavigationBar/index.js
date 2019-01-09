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
  numberOfListItems: PropTypes.number,
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
  numberOfListItems: undefined,
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
      <Grid padded textAlign="left" verticalAlign="middle">
        <Grid.Row className="left floated">
          <Grid.Column>
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
          </Grid.Column>
          {showRecordInput && (
            <Grid.Column>
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
                style={{ width: '6.5em' }}
                type="number"
                value={sliderValue}
              />
            </Grid.Column>
          )}
          {isLargeScreen &&
            showSlider && (
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
                      if (!handleSetCurrentTableRowNumber) {
                        return
                      }
                      // those ifs are a needed hack to avoid double increment when
                      // using hotkey directly after sliding
                      if (newTableRowNumber === currentTableRowNumber + 1) {
                        this.setState({
                          sliderRowNumber: newTableRowNumber - 1,
                        })
                      } else if (
                        newTableRowNumber ===
                        currentTableRowNumber - 1
                      ) {
                        this.setState({
                          sliderRowNumber: newTableRowNumber + 1,
                        })
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
              </Grid.Column>
            )}
          <Grid.Column>
            {!treeActive && (
              <div style={{ fontWeight: 700, width: '7.25em' }}>
                {numberOfListItems} records
              </div>
            )}
          </Grid.Column>
          <Grid.Column>
            {!treeActive && (
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
          </Grid.Column>
          <Grid.Column>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

RecordNavigationBar.propTypes = propTypes
RecordNavigationBar.defaultProps = defaultProps

export default connect(mapStateToProps)(RecordNavigationBar)
