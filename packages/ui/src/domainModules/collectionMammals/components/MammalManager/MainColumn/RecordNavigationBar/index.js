import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import 'common/dist/semantic.css' // eslint-disable-line
import Slider from 'react-rangeslider'

const propTypes = {
  currentRecordNumber: PropTypes.number.isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSetCurrentRecordNumber: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  onShowAllRecords: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onToggleFilters: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  totalRecords: PropTypes.number.isRequired,
}

export class RecordNavigationBar extends Component {
  render() {
    const {
      currentRecordNumber,
      onOpenNewRecordForm: handleOpenNewRecordForm,
      onSetCurrentRecordNumber: handleSetCurrentRecordNumber,
      onSelectNextRecord: handleSelectNextRecord,
      onSelectPreviousRecord: handleSelectPreviousRecord,
      onShowAllRecords: handleShowAllRecords,
      onToggleFilters: handleToggleFilters,
      totalRecords,
    } = this.props

    return (
      <Grid textAlign="center" verticalAlign="middle">
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
          <Input
            disabled={!handleSetCurrentRecordNumber}
            onChange={event =>
              handleSetCurrentRecordNumber(event, event.target.value)
            }
            size="mini"
            style={{ width: '80px' }}
            type="number"
            value={currentRecordNumber}
          />
          <Slider
            max={totalRecords}
            min={1}
            onChange={newRecordNumber => {
              handleSetCurrentRecordNumber(null, newRecordNumber)
            }}
            step={1}
            value={currentRecordNumber}
          />
        </Grid.Column>
        <Grid.Column computer={2} mobile={4} tablet={4}>
          {totalRecords}
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

export default RecordNavigationBar
