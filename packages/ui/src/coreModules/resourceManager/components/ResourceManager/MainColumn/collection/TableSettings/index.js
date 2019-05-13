import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFormValues, reduxForm, SubmissionError } from 'redux-form'
import { Button, Form, Grid, Header, Icon, Message } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { Checkbox, Field } from 'coreModules/form/components'
import { Translate } from 'coreModules/i18n/components'
import { updateUserPreference as updateUserPreferenceAC } from 'coreModules/user/actionCreators'
import userSelectors from 'coreModules/user/globalSelectors'

import { useHandlers } from '../../../../../contexts/resourceManagerHandlers'

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

const mapStateToProps = (state, { form, resource }) => {
  const userPreferences = userSelectors.getUserPreferences(state)
  const savedTableColumnNames =
    (userPreferences && userPreferences[`${resource}TableColumns`]) || undefined
  const columnsSelectedStatus = Object.values(getFormValues(form)(state) || {})

  return {
    savedTableColumnNames,
    someColumnSelected: columnsSelectedStatus.some(Boolean),
  }
}
const mapDispatchToProps = { updateUserPreference: updateUserPreferenceAC }

const propTypes = {
  change: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  resource: PropTypes.string.isRequired,
  savedTableColumnNames: PropTypes.arrayOf(PropTypes.string.isRequired),
  someColumnSelected: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  tableColumnSpecifications: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateUserPreference: PropTypes.func.isRequired,
}
const defaultProps = {
  error: undefined,
  savedTableColumnNames: undefined,
}

const ResultTableSettings = ({
  change,
  error,
  handleSubmit,
  initialize,
  pristine,
  resource,
  savedTableColumnNames,
  someColumnSelected,
  submitting,
  tableColumnSpecifications,
  updateUserPreference,
}) => {
  log.render()
  const { onTableTabClick } = useHandlers()

  const allColumnNames = useMemo(
    () => tableColumnSpecifications.map(({ fieldPath }) => fieldPath),
    [tableColumnSpecifications]
  )
  const columnNames = savedTableColumnNames || allColumnNames

  useEffect(() => {
    if (Array.isArray(columnNames)) {
      initialize(transformColumnNamesToFormValues(columnNames))
    }
  }, [initialize, columnNames])

  const handleCancel = () => {
    onTableTabClick()
  }

  const handleSave = (formValues = {}) => {
    return updateUserPreference(
      `${resource}TableColumns`,
      transformFormValuesToColumnNames(formValues)
    )
      .then(() => {
        return onTableTabClick()
      })
      .catch(err => {
        throw new SubmissionError({
          _error: err.error_description,
        })
      })
  }

  const handleSetAll = value => {
    allColumnNames.forEach(name => {
      change(name, value)
    })
  }

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
                onClick={handleSubmit(handleSave)}
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
  reduxForm({
    form: 'tableSettingsForm',
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResultTableSettings)
