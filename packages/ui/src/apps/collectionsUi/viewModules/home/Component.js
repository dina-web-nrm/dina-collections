import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Form, Grid } from 'semantic-ui-react'
import FieldWrapper from 'coreModules/form/components/FieldWrapper'

import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'
import LocalityDropdownPickerSearch from 'domainModules/locality/components/LocalityDropdownPickerSearch'

import StorageLocationDropdownSearch from 'domainModules/storage/components/StorageLocationDropdownSearch'
import StorageLocationDropdownPickerSearch from 'domainModules/storage/components/StorageLocationDropdownPickerSearch'

import AgentDropdownSearch from 'domainModules/agent/components/AgentDropdownSearch'
import AgentDropdownPickerSearch from 'domainModules/agent/components/AgentDropdownPickerSearch'

import TaxonNameDropdownSearch from 'domainModules/taxon/components/TaxonNameDropdownSearch'
import TaxonNameDropdownPickerSearch from 'domainModules/taxon/components/TaxonNameDropdownPickerSearch'
import AcceptedTaxonNameDropdownPickerSearch from 'domainModules/taxon/components/AcceptedTaxonNameDropdownPickerSearch'

import TaxonDropdownSearch from 'domainModules/taxon/components/TaxonDropdownSearch'
import TaxonDropdownPickerSearch from 'domainModules/taxon/components/TaxonDropdownPickerSearch'

import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { reduxForm } from 'redux-form'

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

const Home = props => {
  const { handleSubmit } = props

  return (
    <PageTemplate>
      <Form onSubmit={handleSubmit(() => {})}>
        <Grid textAlign="left" verticalAlign="top">
          <h1>Locality</h1>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={LocalityDropdownSearch}
                label="Locality dropdown search"
                model="storageLocation"
                module="storage"
                name="localityId"
              />
            </Grid.Column>

            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={LocalityDropdownPickerSearch}
                formName="test"
                label="Locality picker"
                model="storageLocation"
                module="storage"
                name="localityId"
              />
            </Grid.Column>
          </Grid.Row>
          <h1>Storage</h1>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={StorageLocationDropdownSearch}
                label="Storage dropdown search"
                model="storageLocation"
                module="storage"
                name="storageId"
              />
            </Grid.Column>

            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={StorageLocationDropdownPickerSearch}
                formName="test"
                label="Storage picker"
                model="storageLocation"
                module="storage"
                name="storageId"
              />
            </Grid.Column>
          </Grid.Row>

          <h1>Agent</h1>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={AgentDropdownSearch}
                label="Agent dropdown search"
                model="storageLocation"
                module="storage"
                name="agentId"
              />
            </Grid.Column>

            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={AgentDropdownPickerSearch}
                formName="test"
                label="Agent picker"
                model="storageLocation"
                module="storage"
                name="agentId"
              />
            </Grid.Column>
          </Grid.Row>

          <h1>Taxonomy</h1>
          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={TaxonNameDropdownSearch}
                label="Taxon name search"
                model="storageLocation"
                module="storage"
                name="taxonNameId"
              />
            </Grid.Column>

            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={TaxonNameDropdownPickerSearch}
                formName="test"
                label="Taxon name picker"
                model="storageLocation"
                module="storage"
                name="taxonNameId"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={AcceptedTaxonNameDropdownPickerSearch}
                label="Accepted taxon name search"
                model="storageLocation"
                module="storage"
                name="taxonNameId"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={TaxonDropdownSearch}
                label="Taxon search"
                model="storageLocation"
                module="storage"
                name="taxonId"
              />
            </Grid.Column>

            <Grid.Column mobile={4}>
              <FieldWrapper
                autoComplete="off"
                component={TaxonDropdownPickerSearch}
                formName="test"
                label="Taxon picker"
                model="storageLocation"
                module="storage"
                name="taxonId"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </PageTemplate>
  )
}

Home.propTypes = propTypes

export default compose(
  reduxForm({
    destroyOnUnmount: false, // to keep values when switching layout
    enableReinitialize: true,
    form: 'test',
  })
)(Home)
