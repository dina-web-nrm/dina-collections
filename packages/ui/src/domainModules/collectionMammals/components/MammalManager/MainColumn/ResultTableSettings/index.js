import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { Button, Form, Grid, Header, Icon, Message } from 'semantic-ui-react'
import { Checkbox, Field } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { updateUserPreference } from 'coreModules/user/actionCreators'
import userSelectors from 'coreModules/user/globalSelectors'
import { SPECIMENS_MAMMALS_TABLE_COLUMNS } from '../../../../constants'
import { tableColumnNames } from '../tableColumnSpecifications'

const ModuleTranslate = createModuleTranslate('collectionMammals')

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

const mapStateToProps = state => {
  const userPreferences = userSelectors.getUserPreferences(state)

  return {
    savedValue:
      (userPreferences && userPreferences[SPECIMENS_MAMMALS_TABLE_COLUMNS]) ||
      undefined,
  }
}
const mapDispatchToProps = { updateUserPreference }

const propTypes = {
  change: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onTableTabClick: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  savedValue: PropTypes.arrayOf(PropTypes.string.isRequired),
  submitting: PropTypes.bool.isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  error: undefined,
  savedValue: undefined,
}

class ResultTableSettings extends Component {
  constructor(props) {
    super(props)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleSetAll = this.handleSetAll.bind(this)
  }

  componentWillMount() {
    if (Array.isArray(this.props.savedValue)) {
      this.props.initialize(
        transformColumnNamesToFormValues(this.props.savedValue)
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.savedValue !== nextProps.savedValue &&
      Array.isArray(nextProps.savedValue)
    ) {
      this.props.initialize(
        transformColumnNamesToFormValues(nextProps.savedValue)
      )
    }
  }

  handleCancel() {
    this.props.onTableTabClick()
  }

  handleSetAll(value) {
    tableColumnNames.forEach(name => {
      this.props.change(name, value)
    })
  }

  handleSave(formValues = {}) {
    const columnNames = transformFormValuesToColumnNames(formValues)

    return this.props
      .updateUserPreference(SPECIMENS_MAMMALS_TABLE_COLUMNS, columnNames)
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
    const { error, handleSubmit, pristine, submitting } = this.props
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
              <Button onClick={() => this.handleSetAll(true)} size="small">
                Select all
              </Button>
              <Button onClick={() => this.handleSetAll(false)} size="small">
                Deselect all
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {tableColumnNames.map(name => {
              return (
                <Grid.Column key={name} width={16}>
                  <Field
                    autoComplete="off"
                    component={Checkbox}
                    enableHelpNotifications={false}
                    inline
                    label={
                      <ModuleTranslate
                        capitalize
                        textKey={`tableColumns.${name}`}
                      />
                    }
                    module="collectionMammals"
                    name={name}
                    type="checkbox"
                  />
                </Grid.Column>
              )
            })}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button
                disabled={pristine || submitting}
                onClick={handleSubmit(this.handleSave)}
                size="large"
              >
                Save
              </Button>
              <Button basic onClick={this.handleCancel} size="large">
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

const ResultTableSettingsForm = reduxForm({
  form: 'resultTableSettingsForm',
})(ResultTableSettings)

export default connect(mapStateToProps, mapDispatchToProps)(
  ResultTableSettingsForm
)
