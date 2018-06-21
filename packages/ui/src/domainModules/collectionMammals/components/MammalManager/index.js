import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { ColumnLayout } from 'coreModules/layout/components'
import sizeSelectors from 'coreModules/size/globalSelectors'
import {
  actionCreators as keyObjectActionCreators,
  globalSelectors as keyObjectGlobalSelectors,
} from '../../keyObjectModule'
import MainColumn from './MainColumn'
import FilterColumn from './FilterColumn'

const main = {
  key: 'main',
  renderColumn: props => <MainColumn {...props} />,
  width: undefined,
}

const filter = {
  key: 'filter',
  renderColumn: props => <FilterColumn {...props} />,
  width: '300px',
}

const filterMobile = {
  key: 'filterMobile',
  renderColumn: props => <FilterColumn {...props} />,
  width: '100%',
}

const getColumns = createSelector(
  ({ filterColumnIsOpen }) => filterColumnIsOpen,
  ({ isSmall }) => isSmall,
  (filterColumnIsOpen, isSmall) => {
    if (filterColumnIsOpen) {
      if (isSmall) {
        return [filterMobile]
      }

      return [main, filter]
    }

    return [main]
  }
)

const mapStateToProps = state => {
  return {
    currentRecordNumber: keyObjectGlobalSelectors.get.currentRecordNumber(
      state
    ),
    filterColumnIsOpen: keyObjectGlobalSelectors.get.filterColumnIsOpen(state),
    isSmall: sizeSelectors.getIsSmall(state),
    mainColumnViewKey: keyObjectGlobalSelectors.get.mainColumnViewKey(state),
    totalNumberOfRecords: keyObjectGlobalSelectors.get.totalNumberOfRecords(
      state
    ),
  }
}

const mapDispatchToProps = {
  setCurrentRecordNumber: keyObjectActionCreators.set.currentRecordNumber,
  setFilterColumnIsOpen: keyObjectActionCreators.set.filterColumnIsOpen,
  setMainColumnViewKey: keyObjectActionCreators.set.mainColumnViewKey,
  setTotalNumberOfRecords: keyObjectActionCreators.set.totalNumberOfRecords,
}

const propTypes = {
  currentRecordNumber: PropTypes.number,
  filterColumnIsOpen: PropTypes.bool.isRequired,
  isSmall: PropTypes.bool.isRequired,
  mainColumnViewKey: PropTypes.string.isRequired,
  setCurrentRecordNumber: PropTypes.func.isRequired,
  setFilterColumnIsOpen: PropTypes.func.isRequired,
  setMainColumnViewKey: PropTypes.func.isRequired,
  // setTotalNumberOfRecords: PropTypes.func.isRequired,
  totalNumberOfRecords: PropTypes.number,
}
const defaultProps = {
  currentRecordNumber: undefined,
  totalNumberOfRecords: undefined,
}

class MammalManager extends Component {
  constructor(props) {
    super(props)
    this.getColumns = this.getColumns.bind(this)
    this.handleSetMainColumnViewKey = this.handleSetMainColumnViewKey.bind(this)
    this.handleSetCurrentRecordNumber = this.handleSetCurrentRecordNumber.bind(
      this
    )
    this.handleToggleFilters = this.handleToggleFilters.bind(this)
    this.handleOpenNewRecordForm = this.handleOpenNewRecordForm.bind(this)
    this.handleOpenTableView = this.handleOpenTableView.bind(this)
    this.handleOpenItemView = this.handleOpenItemView.bind(this)
    this.handleSelectNextRecord = this.handleSelectNextRecord.bind(this)
    this.handleSelectPreviousRecord = this.handleSelectPreviousRecord.bind(this)
  }

  getColumns() {
    const { filterColumnIsOpen, isSmall } = this.props
    return getColumns({ filterColumnIsOpen, isSmall })
  }

  handleSetMainColumnViewKey(event, key) {
    event.preventDefault()
    this.props.setMainColumnViewKey(key)
  }

  handleSetCurrentRecordNumber(event, newRecordNumber) {
    event.preventDefault()
    this.props.setCurrentRecordNumber(newRecordNumber)
  }

  handleToggleFilters(event) {
    event.preventDefault()
    this.props.setFilterColumnIsOpen(event, !this.props.filterColumnIsOpen)
  }

  handleOpenNewRecordForm(event) {
    this.handleSetMainColumnViewKey(event, 'newRecord')
  }

  handleOpenTableView(event) {
    this.handleSetMainColumnViewKey(event, 'table')
  }

  handleOpenItemView(event) {
    this.handleSetMainColumnViewKey(event, 'item')
  }

  handleSelectNextRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber + 1)
  }

  handleSelectPreviousRecord(event) {
    this.handleSetCurrentRecordNumber(event, this.props.currentRecordNumber - 1)
  }

  render() {
    const {
      currentRecordNumber,
      mainColumnViewKey,
      totalNumberOfRecords,
    } = this.props

    const lastRecordNumber = totalNumberOfRecords // TODO: check first selectedNumberOfRecords
    const isNewRecordView = mainColumnViewKey === 'newRecord'
    const showSelectNextRecord =
      !isNewRecordView && currentRecordNumber !== lastRecordNumber
    const showSelectPreviousRecord =
      !isNewRecordView && currentRecordNumber !== 1

    return (
      <ColumnLayout
        columns={this.getColumns()}
        mainColumnViewKey={mainColumnViewKey}
        onOpenNewRecordForm={!isNewRecordView && this.handleOpenNewRecordForm}
        onSelectNextRecord={showSelectNextRecord && this.handleSelectNextRecord}
        onSelectPreviousRecord={
          showSelectPreviousRecord && this.handleSelectPreviousRecord
        }
        onToggleFilters={!isNewRecordView && this.handleToggleFilters}
      />
    )
  }
}

MammalManager.propTypes = propTypes
MammalManager.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MammalManager
)
