import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import formValidator from 'common/es5/error/validators/formValidator'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { DropdownSearch, Input } from 'coreModules/form/components'

import { GROUP_1, GROUP_2, GROUP_3, GROUP_4 } from '../../../constants'

export const FORM_NAME = 'storageLocationFilter'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  error: '',
}

const noop = () => {}

const groups = [GROUP_1, GROUP_2, GROUP_3, GROUP_4]

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
    const { error, handleSubmit } = this.props
    return (
      <Grid padded>
        <Grid.Column>
          <Form error={!!error} onSubmit={handleSubmit(noop)}>
            <Grid textAlign="left" verticalAlign="top">
              <Grid.Row>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    model="storageLocation"
                    module="storage"
                    name="name"
                    type="text"
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={DropdownSearch}
                    model="storageLocation"
                    module="storage"
                    name="group"
                    options={dropdownOptions}
                    type="dropdown-search-local"
                  />
                </Grid.Column>
              </Grid.Row>
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
  validate: formValidator({ model: 'storageLocation' }),
})(BaseForm)
