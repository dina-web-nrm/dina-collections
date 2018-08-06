import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import Slider from 'react-rangeslider'

const propTypes = {
  currentTableRowNumber: PropTypes.number.isRequired,
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
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  totalNumberOfRecords: undefined,
}

export class RecordNavigationBar extends Component {
  render() {
    const {
      currentTableRowNumber,
      onOpenNewRecordForm: handleOpenNewRecordForm,
      onSetCurrentTableRowNumber: handleSetCurrentTableRowNumber,
      onSelectNextRecord: handleSelectNextRecord,
      onSelectPreviousRecord: handleSelectPreviousRecord,
      onShowAllRecords: handleShowAllRecords,
      onToggleFilters: handleToggleFilters,
      totalNumberOfRecords,
    } = this.props

    const hasRecords = totalNumberOfRecords > 0

    return (
      <Grid padded textAlign="center" verticalAlign="middle">
        <Grid.Column computer={2} mobile={4} tablet={4}>
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
        <Grid.Column computer={3} mobile={8} tablet={8}>
          {hasRecords && (
            <Input
              disabled={!handleSetCurrentTableRowNumber}
              max={totalNumberOfRecords}
              min={1}
              onChange={event =>
                handleSetCurrentTableRowNumber(event, event.target.value)
              }
              size="mini"
              style={{ width: '80px' }}
              type="number"
              value={currentTableRowNumber}
            />
          )}
          {hasRecords && (
            <Slider
              max={totalNumberOfRecords}
              min={1}
              onChange={newTableRowNumber => {
                handleSetCurrentTableRowNumber(null, newTableRowNumber)
              }}
              step={1}
              value={currentTableRowNumber}
            />
          )}
        </Grid.Column>
        <Grid.Column computer={2} mobile={4} tablet={4}>
          {totalNumberOfRecords}
          <br />Total records
          {!handleOpenNewRecordForm && <br />}
          {!handleOpenNewRecordForm && <i>*Adding new*</i>}
        </Grid.Column>
        <Grid.Column computer={1} only="computer">
          <Button
            disabled={!handleShowAllRecords}
            icon
            onClick={event => handleShowAllRecords(event)}
          >
            <Icon name="book" />
            Show All
          </Button>
        </Grid.Column>
        <Grid.Column computer={1} only="computer">
          <Button
            disabled={!handleOpenNewRecordForm}
            icon
            onClick={event => handleOpenNewRecordForm(event)}
          >
            <Icon name="plus" />
            New record
          </Button>
        </Grid.Column>
        <Grid.Column computer={5} only="computer" />
        <Grid.Column computer={2} only="computer">
          <Button
            disabled={!handleToggleFilters}
            icon
            onClick={event => handleToggleFilters(event)}
          >
            <Icon name="search" />
            Find
          </Button>
        </Grid.Column>
      </Grid>
    )
  }
}

RecordNavigationBar.propTypes = propTypes
RecordNavigationBar.defaultProps = defaultProps

export default RecordNavigationBar
