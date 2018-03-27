import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import localityServiceSelectors from 'domainModules/localityService/globalSelectors'
import { capitalizeFirstLetter } from 'common/es5/stringFormatters'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input } from 'coreModules/form/components'
import { ALL } from 'domainModules/localityService/constants'
import LocalityDropdownSearch from 'domainModules/collectionMammals/components/LocalityDropdownSearch'
import FormControll from './FormControll'

const log = createLog('modules:user:EditForm')

const propTypes = {
  curatedLocalities: PropTypes.object.isRequired,
  displayBackButton: PropTypes.bool,
  displayResetButton: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  curatedLocalities: {},
  displayBackButton: false,
  displayResetButton: false,
  error: '',
}

const mapStateToProps = state => {
  return {
    curatedLocalities: localityServiceSelectors.getCuratedLocalities(state),
  }
}

export class Edit extends Component {
  render() {
    log.render()
    const {
      curatedLocalities,
      displayBackButton,
      displayResetButton,
      error,
      handleSubmit,
      invalid,
      pristine,
      reset,
      submitFailed,
      submitSucceeded,
      submitting,
    } = this.props
    const formatLocalityName = id => {
      return curatedLocalities[id]
        ? capitalizeFirstLetter(curatedLocalities[id].name)
        : ''
    }

    return (
      <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                helpNotificationProps={{
                  descriptionHeaderKey: 'name',
                  descriptionKey: 'nameDescription',
                }}
                label="Name"
                module="localities"
                name="name"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Group"
                module="localities"
                name="group"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8}>
              <FieldWrapper
                autoComplete="off"
                component={LocalityDropdownSearch}
                format={formatLocalityName}
                group={ALL}
                label="Parent"
                LocalityDropdownSearch
                module="localities"
                name="parent.id"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={8}>
              Elevatim
              <Grid.Row>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Min"
                    module="localities"
                    name="verticalPosition.minimumElevationInMeters"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.maximumElevationInMeters"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column mobile={8}>
              Depth
              <Grid.Row>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.maximumDepthInMeters"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={8}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Max"
                    module="localities"
                    name="verticalPosition.minimumDepthInMeters"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Latitude"
                module="localities"
                name="centralPosition.latitude"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Longitude"
                module="localities"
                name="centralPosition.longitude"
                type="text"
              />
            </Grid.Column>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={Input}
                label="Uncertainty"
                module="localities"
                name="centralPosition.uncertaintyInMeters"
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <FormControll
            displayBackButton={displayBackButton}
            displayResetButton={displayResetButton}
            error={error}
            invalid={invalid}
            pristine={pristine}
            reset={reset}
            submitFailed={submitFailed}
            submitSucceeded={submitSucceeded}
            submitting={submitting}
          />
        </Grid>
      </Form>
    )
  }
}

Edit.propTypes = propTypes
Edit.defaultProps = defaultProps

export const EditForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  form: 'EditLocalities',
  validate: formValidator({ model: 'curatedLocality' }),
})(Edit)

export default connect(mapStateToProps)(EditForm)
