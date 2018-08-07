import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { Button, Form, Grid, Header, Message } from 'semantic-ui-react'
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
  reset: PropTypes.func.isRequired,
  savedValue: PropTypes.arrayOf(PropTypes.string.isRequired),
  submitting: PropTypes.bool.isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  error: undefined,
  savedValue: undefined,
}

class ConfigureTable extends Component {
  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleSetAll = this.handleSetAll.bind(this)
    this.handleReset = this.handleReset.bind(this)
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

  handleSetAll(value) {
    tableColumnNames.forEach(name => {
      this.props.change(name, value)
    })
  }

  handleReset() {
    this.props.reset()
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
            <Grid.Column width={16}>
              <Header>Set visible table columns</Header>
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
              <Button
                basic
                disabled={pristine || submitting}
                onClick={() => this.handleReset()}
                size="large"
              >
                Reset
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {error && <Message error>{error}</Message>}
      </Form>
    )
  }
}

ConfigureTable.propTypes = propTypes
ConfigureTable.defaultProps = defaultProps

const ConfigureTableForm = reduxForm({
  form: 'configureTable',
})(ConfigureTable)

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureTableForm)
