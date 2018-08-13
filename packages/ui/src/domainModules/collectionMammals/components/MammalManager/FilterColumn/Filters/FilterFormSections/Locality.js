import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'
import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'
import { ALL } from 'domainModules/locality/constants'

const locationTags = 'LocationTags'
const locationFieldName = `locality.location|searchTags-${locationTags}`

const propTypes = {
  getDrilldownQuery: PropTypes.func.isRequired,
}

class LocalityFilterForm extends PureComponent {
  render() {
    const { getDrilldownQuery } = this.props

    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column mobile={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            group={ALL}
            label="Higher geography"
            model="place"
            module="locality"
            name="locality.higherGeography|singleMatch-matchPlaceIdTags"
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="aggregateLocationTags"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(locationFieldName)}
            filterFunctionName={`search${locationTags}`}
            label="Location"
            name={locationFieldName}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

LocalityFilterForm.propTypes = propTypes

export default LocalityFilterForm
