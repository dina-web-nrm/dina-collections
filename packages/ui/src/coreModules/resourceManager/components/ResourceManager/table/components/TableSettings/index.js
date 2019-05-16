import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, reduxForm, SubmissionError } from 'redux-form'
import { Button, Form, Grid, Header, Icon, Message } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Checkbox, Field } from 'coreModules/form/components'
import { Translate } from 'coreModules/i18n/components'
import { useNavigation } from '../../../shared/contexts/resourceManagerNavigation'
import createTableWrapper from '../../higherOrderComponents/createTableWrapper'

const log = createLog('resourceManager:TableSettings')

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

const mapStateToProps = (state, { form }) => {
  return {
    formValues: getFormValues(form)(state),
  }
}

const propTypes = {
  allTableColumnFieldPaths: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
  change: PropTypes.func.isRequired,
  error: PropTypes.string,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  onSaveTableColumnsToShow: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  tableColumnsToShow: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}
const defaultProps = {
  error: undefined,
  formValues: undefined,
}

const ResultTableSettings = ({
  allTableColumnFieldPaths,
  change,
  error,
  formValues,
  handleSubmit,
  initialize,
  onSaveTableColumnsToShow: handleSaveTableColumnsToShow,
  pristine,
  submitting,
  tableColumnSpecifications,
  tableColumnsToShow,
}) => {
  log.render()

  const { navigateTable } = useNavigation()

  const someColumnSelected = useMemo(() => {
    return Object.values(formValues || {}).some(Boolean)
  }, [formValues])

  const handleCancel = () => navigateTable()

  const handleSetAll = value => {
    allTableColumnFieldPaths.forEach(fieldPath => {
      change(fieldPath, value)
    })
  }

  useEffect(() => {
    initialize(transformColumnNamesToFormValues(tableColumnsToShow))
  }, [initialize, tableColumnsToShow])

  return (
    <div className="ui fluid dina background" style={{ padding: '20px' }}>
      <Form error={!!error}>
        <Grid textAlign="left" verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={15}>
              <Header>Set visible table columns</Header>
            </Grid.Column>
            <Grid.Column textAlign="right" width={1}>
              <Icon
                name="close"
                onClick={handleCancel}
                size="large"
                style={{ cursor: 'pointer' }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Button
                data-testid="selectAllButton"
                onClick={() => handleSetAll(true)}
                size="small"
              >
                Select all
              </Button>
              <Button
                data-testid="deselectAllButton"
                onClick={() => handleSetAll(false)}
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
                    label={<Translate capitalize textKey={label} />}
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
                onClick={handleSubmit((formData = {}) => {
                  return handleSaveTableColumnsToShow(
                    transformFormValuesToColumnNames(formData)
                  )
                    .then(() => {
                      return navigateTable()
                    })
                    .catch(err => {
                      throw new SubmissionError({
                        _error: err.error_description,
                      })
                    })
                })}
                size="large"
              >
                Save
              </Button>
              <Button
                basic
                data-testid="cancelButton"
                onClick={handleCancel}
                size="large"
              >
                Cancel
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {error && <Message error>{error}</Message>}
      </Form>
    </div>
  )
}

ResultTableSettings.propTypes = propTypes
ResultTableSettings.defaultProps = defaultProps

export default compose(
  createTableWrapper(),
  reduxForm({
    form: 'tableSettingsForm',
  }),
  connect(mapStateToProps)
)(ResultTableSettings)
