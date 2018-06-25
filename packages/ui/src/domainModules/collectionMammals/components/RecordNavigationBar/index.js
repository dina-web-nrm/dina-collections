import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Grid, Input } from 'semantic-ui-react'
import 'common/dist/semantic.css' // eslint-disable-line
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

const propTypes = {
  currentRecordNumber: PropTypes.number.isRequired,
  onCurrentRecordNumberChange: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  onOpenNewRecordForm: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectCurrentRecordNumber: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]).isRequired,
  onSelectNextRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
  onSelectPreviousRecord: PropTypes.oneOfType([PropTypes.func, PropTypes.bool])
    .isRequired,
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
      onCurrentRecordNumberChange: handleCurrentRecordNumberChange,
      onOpenNewRecordForm: handleOpenNewRecordForm,
      onSelectCurrentRecordNumber: handleSelectCurrentRecordNumberChange,
      onSelectNextRecord: handleSelectNextRecord,
      onSelectPreviousRecord: handleSelectPreviousRecord,
      onShowAllRecords: handleShowAllRecords,
      onToggleFilters: handleToggleFilters,
      totalRecords,
    } = this.props

    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column computer={2} mobile={16} tablet={5}>
          <Button.Group>
            <Button
              disabled={!handleSelectPreviousRecord}
              icon
              onClick={() => handleSelectPreviousRecord() || undefined}
            >
              <Icon name="chevron left" />
            </Button>
            <Button
              disabled={!handleSelectNextRecord}
              icon
              onClick={() => handleSelectNextRecord() || undefined}
            >
              <Icon name="chevron right" />
            </Button>
          </Button.Group>
        </Grid.Column>
        <Grid.Column computer={2} mobile={8} tablet={6}>
          <Input
            disabled={!handleCurrentRecordNumberChange}
            onChange={() => handleCurrentRecordNumberChange() || undefined}
            size="mini"
            style={{ width: '80px' }}
            type="number"
            value={currentRecordNumber}
          />
          <Slider
            max={totalRecords}
            min={1}
            onChange={() =>
              handleSelectCurrentRecordNumberChange() || undefined
            }
            step={1}
            value={currentRecordNumber}
          />
        </Grid.Column>
        <Grid.Column computer={2} mobile={8} tablet={5}>
          {totalRecords}
          <br />Total records
          {!handleOpenNewRecordForm && <br />}
          {!handleOpenNewRecordForm && <i>*Adding new*</i>}
        </Grid.Column>
        <Grid.Column computer={1} mobile={4} tablet={2}>
          <Button
            disabled={!handleShowAllRecords}
            icon
            onClick={() => handleShowAllRecords() || undefined}
          >
            <Icon name="book" />
            Show All
          </Button>
        </Grid.Column>
        <Grid.Column computer={1} mobile={4} tablet={1}>
          <Button
            disabled={!handleOpenNewRecordForm}
            icon
            onClick={() => handleOpenNewRecordForm() || undefined}
          >
            <Icon name="plus" />
            New record
          </Button>
        </Grid.Column>
        <Grid.Column computer={5} mobile={4} tablet={11} />
        <Grid.Column computer={1} mobile={4} tablet={1}>
          <Button
            disabled={!handleToggleFilters}
            icon
            onClick={() => handleToggleFilters() || undefined}
          >
            <Icon name="search" />
            Find
          </Button>
        </Grid.Column>
        <Grid.Column computer={1} />
      </Grid>
    )
  }
}

RecordNavigationBar.propTypes = propTypes

export default RecordNavigationBar
