import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Form, Grid } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'

import createLog from 'utilities/log'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'
import { DropdownSearch, Input } from 'coreModules/form/components'
import { DROPDOWN_FILTER_OPTIONS } from '../../../constants'

export const FORM_NAME = 'taxonFilter'

const log = createLog('modules:locality:BaseForm')

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

const defaultProps = {
  error: '',
}

const noop = () => {}

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
                    label="Accepted name"
                    model="taxonName"
                    module="taxon"
                    name="name"
                    type="text"
                  />
                </Grid.Column>

                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={DropdownSearch}
                    fluid
                    label="Accepted name rank"
                    model="taxonName"
                    module="taxon"
                    name="rank"
                    options={DROPDOWN_FILTER_OPTIONS}
                    type="dropdown-search-local"
                  />
                </Grid.Column>
                <Grid.Column width={16}>
                  <FieldWrapper
                    autoComplete="off"
                    component={Input}
                    label="Vernacular name"
                    model="taxonName"
                    module="taxon"
                    name="vernacularName"
                    type="text"
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
  form: FORM_NAME,
})(BaseForm)
