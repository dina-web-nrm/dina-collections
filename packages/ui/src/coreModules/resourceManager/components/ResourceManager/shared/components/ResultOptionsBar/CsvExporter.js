import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Icon, Menu, Modal, Popup } from 'semantic-ui-react'
import { globalSelectors as searchSelectors } from 'coreModules/search/keyObjectModule'
import crudActionCreators from 'coreModules/crud/actionCreators'
import downloadFileActionCreator from 'coreModules/api/actionCreators/downloadFile'
import userSelectors from 'coreModules/user/globalSelectors'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { FormModal } from 'coreModules/form/components'

const mapStateToProps = (state, { resource }) => {
  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    searchResult: searchSelectors.get[':resource.searchState'](state, {
      resource,
    }),
    selectedTableColumnFieldPaths:
      (userPreferences && userPreferences[`${resource}TableColumnsToShow`]) ||
      undefined,
  }
}

const mapDispatchToProps = {
  createExportInfo: crudActionCreators.exportJob.create,
  downloadFile: downloadFileActionCreator,
  getOneExportInfo: crudActionCreators.exportJob.getOne,
}

const propTypes = {
  createExportInfo: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired,
  getOneExportInfo: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  pollInterval: PropTypes.number,
  pollLimit: PropTypes.number,
  resource: PropTypes.string.isRequired,
  searchResult: PropTypes.object,
  selectedTableColumnFieldPaths: PropTypes.array,
  tableColumnSpecifications: PropTypes.arrayOf(
    PropTypes.shape({
      fieldPath: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

const defaultProps = {
  pollInterval: 500,
  pollLimit: 100,
  searchResult: undefined,
  selectedTableColumnFieldPaths: undefined,
}

export class CsvExporter extends Component {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleExportToCsv = this.handleExportToCsv.bind(this)
    this.exportToCsv = this.exportToCsv.bind(this)
    this.pollId = this.pollId.bind(this)
    this.state = {
      exportJobId: undefined,
      exportStatus: '',
      fileName: '',
    }
  }

  pollId(id) {
    const { pollLimit, pollInterval } = this.props
    let count = 0
    const poll = () => {
      if (!this.isExporting) {
        return null
      }
      count += 1
      return this.props
        .getOneExportInfo({
          id,
          queryParams: {
            includeFields: [
              'id',
              'attributes.filePath',
              'attributes.succeededAt',
              'attributes.failedAt',
            ],
          },
          relationships: [],
          storeInState: false,
        })
        .then(item => {
          if (item) {
            const attributes = item && item.attributes
            if (attributes.succeededAt) {
              this.updateStatus('exportDone', {
                exportJobId: item.id,
                fileName: attributes.filePath,
              })
            }
            if (attributes.failedAt) {
              this.updateStatus('failed')
            }
          }

          if (count >= pollLimit) {
            return this.updateStatus('failed')
          }

          return setTimeout(() => {
            poll()
          }, pollInterval)
        })
        .catch(() => {
          this.updateStatus('failed')
        })
    }
    return poll()
  }

  exportToCsv() {
    const {
      selectedTableColumnFieldPaths,
      resource,
      searchResult = {},
      tableColumnSpecifications,
      i18n,
    } = this.props

    const exportFields = tableColumnSpecifications
      .map(({ fieldPath, label }) => {
        if (
          fieldPath &&
          (selectedTableColumnFieldPaths
            ? selectedTableColumnFieldPaths.includes(fieldPath)
            : true)
        ) {
          return {
            default: 'NULL',
            fieldPath: `attributes.${fieldPath}`,
            label: i18n.translate({
              capitalize: true,
              textKey: label,
            }),
          }
        }

        return null
      })
      .filter(Boolean)

    exportFields.push({
      fieldPath: 'id',
      label: 'Id',
    })

    const exportIds = (searchResult.items || []).map(item => {
      return item.id
    })
    return this.props
      .createExportInfo({
        item: {
          attributes: {
            exportFields,
            exportIds,
            resource,
          },
        },
      })
      .then(({ id }) => {
        return this.pollId(id)
      })
  }

  handleExportToCsv(event) {
    event.preventDefault()
    event.stopPropagation()
    this.exportToCsv()
    setTimeout(() => {
      this.updateStatus('exporting')
    })
  }

  updateStatus(status, params = {}) {
    if (status === 'exporting') {
      this.isExporting = true
    } else {
      this.isExporting = false
    }
    const newState = {
      exportStatus: status,
      ...params,
    }
    this.setState(newState)
  }

  handleClose() {
    this.setState({
      exportJobId: undefined,
      exportStatus: '',
      fileName: '',
    })
  }

  render() {
    const { exportJobId, fileName, exportStatus } = this.state
    const fileUrl = `/api/export/v01/exportJobs/${exportJobId}/actions/downloadExport/${fileName}`

    let modalContent
    if (exportStatus === 'failed') {
      modalContent = (
        <div data-testid="exportFailedMessage">
          Something went wrong{' '}
          <Button content="Close" onClick={this.handleClose} type="button" />
        </div>
      )
    }

    if (exportStatus === 'exportDone') {
      modalContent = (
        <div>
          <Button
            data-testid="downloadButton"
            onClick={event => {
              this.props.downloadFile({ fileName, fileUrl })
              this.handleClose(event)
            }}
            type="button"
          >
            Download
          </Button>
          <Button content="Close" onClick={this.handleClose} type="button" />
        </div>
      )
    }

    if (exportStatus === 'exporting') {
      modalContent = (
        <div>
          <Button
            data-testid="downloadLoadingButton"
            disabled
            loading
            type="button"
          >
            Download
          </Button>

          <Button content="Close" onClick={this.handleClose} type="button" />
        </div>
      )
    }

    let exportModal = null
    if (modalContent) {
      exportModal = (
        <FormModal onClose={this.handleClose} open>
          <Modal.Header>
            Exporting{' '}
            <Icon
              name="close"
              onClick={this.handleClose}
              size="small"
              style={{ float: 'right' }}
            />
          </Modal.Header>
          <Modal.Content>{modalContent}</Modal.Content>
        </FormModal>
      )
    }

    return (
      <React.Fragment>
        {exportModal}

        {!modalContent && (
          <Popup
            content={
              !exportModal && (
                <Button
                  content="Export result to CSV"
                  data-testid="exportToCsvButton"
                  onClick={event => this.handleExportToCsv(event)}
                  type="button"
                />
              )
            }
            on="click"
            position="bottom right"
            trigger={
              <Menu.Item data-testid="shareMenuItem" link>
                <Icon name="share" style={{ cursor: 'pointer' }} />
              </Menu.Item>
            }
          />
        )}
      </React.Fragment>
    )
  }
}

CsvExporter.defaultProps = defaultProps
CsvExporter.propTypes = propTypes

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withI18n()
)(CsvExporter)
