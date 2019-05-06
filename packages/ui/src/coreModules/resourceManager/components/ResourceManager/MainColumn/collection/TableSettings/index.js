import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, reduxForm, SubmissionError } from 'redux-form'
import { Button, Form, Grid, Header, Icon, Message } from 'semantic-ui-react'
import { Checkbox, Field } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { updateUserPreference } from 'coreModules/user/actionCreators'
import userSelectors from 'coreModules/user/globalSelectors'

const ModuleTranslate = createModuleTranslate('specimen')

const transformColumnNamesToFormValues = columnNames => {
  return columnNames.reduce((obj, columnName) => {
    return {
      ...obj,
      [columnName]: true,
    }
  }, {})
}
const transformFormValuesToColumnNames = formValues => {
  return Object.keys(formValues).reduce((columnNames, name) => {
    if (formValues[name]) {
      columnNames.push(name)
    }
    return columnNames
  }, [])
}

const mapStateToProps = (
  state,
  { form, resource, tableColumnSpecifications }
) => {
  const userPreferences = userSelectors.getUserPreferences(state)
  const savedColumns =
    userPreferences && userPreferences[`${resource}TableColumns`]
  const allTableColumnNames = tableColumnSpecifications.map(
    ({ fieldPath }) => fieldPath
  )
  const columnsSelectedStatus = Object.values(getFormValues(form)(state) || {})

  return {
    allTableColumnNames,
    someColumnSelected: columnsSelectedStatus.some(Boolean),
    tableColumnNames: savedColumns || allTableColumnNames,
  }
}
const mapDispatchToProps = { updateUserPreference }

const propTypes = {
  allTableColumnNames: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
  change: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onTableTabClick: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  resource: PropTypes.string.isRequired,
  someColumnSelected: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  tableColumnNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  tableColumnSpecifications: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  error: undefined,
}

class ResultTableSettings extends Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSetAll = this.handleSetAll.bind(this)
  }

  componentWillMount() {
    if (Array.isArray(this.props.tableColumnNames)) {
      this.props.initialize(
        transformColumnNamesToFormValues(this.props.tableColumnNames)
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tableColumnNames !== nextProps.tableColumnNames &&
      Array.isArray(nextProps.tableColumnNames)
    ) {
      this.props.initialize(
        transformColumnNamesToFormValues(nextProps.tableColumnNames)
      )
    }
  }

  handleCancel() {
    this.props.onTableTabClick()
  }

  handleSetAll(value) {
    this.props.allTableColumnNames.forEach(name => {
      this.props.change(name, value)
    })
  }

  handleSave(formValues = {}) {
    const columnNames = transformFormValuesToColumnNames(formValues)

    return this.props
      .updateUserPreference(`${this.props.resource}TableColumns`, columnNames)
      .then(() => {
        return this.props.onTableTabClick()
      })
      .catch(error => {
        throw new SubmissionError({
          _error: error.error_description,
        })
      })
  }

  render() {
    const {
      error,
      handleSubmit,
      pristine,
      someColumnSelected,
      submitting,
      tableColumnSpecifications,
    } = this.props

    return (
      <Form error={!!error}>
        <Grid textAlign="left" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={15}>
              <Header>Set visible table columns</Header>
            </Grid.Column>
            <Grid.Column textAlign="right" width={1}>
              <Icon
                name="close"
                onClick={this.handleCancel}
                size="large"
                style={{ cursor: 'pointer' }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button
                data-testid="selectAllButton"
                onClick={() => this.handleSetAll(true)}
                size="small"
              >
                Select all
              </Button>
              <Button
                data-testid="deselectAllButton"
                onClick={() => this.handleSetAll(false)}
                size="small"
              >
                Deselect all
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {tableColumnSpecifications.map(({ fieldPath, label }) => {
              return (
                <Grid.Column key={fieldPath} width={16}>
                  <Field
                    autoComplete="off"
                    component={Checkbox}
                    enableHelpNotifications={false}
                    inline
                    label={<ModuleTranslate capitalize textKey={label} />}
                    module="specimen"
                    name={fieldPath}
                    type="checkbox"
                  />
                </Grid.Column>
              )
            })}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button
                data-testid="saveButton"
                disabled={!someColumnSelected || pristine || submitting}
                onClick={handleSubmit(this.handleSave)}
                size="large"
              >
                Save
              </Button>
              <Button
                basic
                data-testid="cancelButton"
                onClick={this.handleCancel}
                size="large"
              >
                Cancel
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {error && <Message error>{error}</Message>}
      </Form>
    )
  }
}

ResultTableSettings.propTypes = propTypes
ResultTableSettings.defaultProps = defaultProps

export default compose(
  reduxForm({
    form: 'resultTableSettingsForm',
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResultTableSettings)
