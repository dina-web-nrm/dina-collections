import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import {
  LEVEL_CABINET,
  LEVEL_INSTITUTION,
  LEVEL_MOUNTING_WALL,
  LEVEL_ROOM,
  LEVEL_SHELF,
} from 'common/es5/constants/storage'
import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { DropdownSearch, Input } from 'coreModules/form/components'

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

const groups = [
  LEVEL_ROOM,
  LEVEL_MOUNTING_WALL,
  LEVEL_CABINET,
  LEVEL_SHELF,
  LEVEL_INSTITUTION,
]

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
                    label="Name"
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
                    fluid
                    label="Storage level"
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
  destroyOnUnmount: false,
  form: FORM_NAME,
})(BaseForm)
