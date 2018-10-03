import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { Input, DropdownSearch } from 'coreModules/form/components'
import LocalityDropdownSearch from '../../../components/LocalityDropdownSearch'
import { CONTINENT, COUNTRY, DISTRICT, PROVINCE } from '../../../constants'

export const FORM_NAME = 'placeEdit'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  content: PropTypes.any,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  content: undefined,
  error: '',
}

const groups = [CONTINENT, COUNTRY, DISTRICT, PROVINCE]

const dropdownOptions = groups.map(group => {
  return {
    key: group,
    text: group,
    value: group,
  }
})

export class BaseForm extends Component {
  render() {
    log.render()
    const { content, error, handleSubmit } = this.props
    return (
      <Grid padded>
        <Grid.Column>
          <Form error={!!error} onSubmit={handleSubmit(this.props.onSubmit)}>
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Row>
                <Grid.Column width={6}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    model="place"
                    module="locality"
                    name="name"
                    type="text"
                  />
                </Grid.Column>

                <Grid.Column width={6}>
                  <FieldWrapper
                    autoComplete="off"
                    component={DropdownSearch}
                    model="place"
                    module="locality"
                    name="group"
                    options={dropdownOptions}
                    type="dropdown-search-local"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={6}>
                  <FieldWrapper
                    autoComplete="off"
                    component={LocalityDropdownSearch}
                    model="place"
                    module="locality"
                    name="parent.id"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={8}>
                  Elevatim
                  <Grid>
                    <Grid.Row>
                      <Grid.Column mobile={8}>
                        <FieldWrapper
                          autoComplete="off"
                          component={Input}
                          model="place"
                          module="locality"
                          name="verticalPosition.minimumElevationInMeters"
                          type="text"
                        />
                      </Grid.Column>
                      <Grid.Column mobile={8}>
                        <FieldWrapper
                          autoComplete="off"
                          component={Input}
                          model="place"
                          module="locality"
                          name="verticalPosition.maximumElevationInMeters"
                          type="text"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column mobile={8}>
                  Depth
                  <Grid>
                    <Grid.Row>
                      <Grid.Column mobile={8}>
                        <FieldWrapper
                          autoComplete="off"
                          component={Input}
                          label="Max"
                          model="place"
                          module="locality"
                          name="verticalPosition.maximumDepthInMeters"
                          type="text"
                        />
                      </Grid.Column>
                      <Grid.Column mobile={8}>
                        <FieldWrapper
                          autoComplete="off"
                          component={Input}
                          label="Max"
                          model="place"
                          module="locality"
                          name="verticalPosition.minimumDepthInMeters"
                          type="text"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column mobile={4}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Latitude"
                    model="place"
                    module="locality"
                    name="centralPosition.latitude"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={4}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Longitude"
                    model="place"
                    module="locality"
                    name="centralPosition.longitude"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column mobile={4}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Uncertainty"
                    model="place"
                    module="locality"
                    name="centralPosition.uncertaintyInMeters"
                    type="text"
                  />
                </Grid.Column>
              </Grid.Row>
              {content && (
                <Grid.Row>
                  <Grid.Column>{content}</Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

BaseForm.propTypes = propTypes
BaseForm.defaultProps = defaultProps

export default reduxForm({
  destroyOnUnmount: true, // to keep values when switching layout
  enableReinitialize: true,
  form: FORM_NAME,
  validate: formValidator({ model: 'place' }),
})(BaseForm)
