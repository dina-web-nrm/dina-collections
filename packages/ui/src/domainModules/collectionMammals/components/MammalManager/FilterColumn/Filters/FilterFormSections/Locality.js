import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { Field } from 'coreModules/form/components'
import { MultipleSearchTagsSelectField } from 'coreModules/search/components'
import LocalityDropdownSearch from 'domainModules/locality/components/LocalityDropdownSearch'
import { ALL } from 'domainModules/locality/constants'

const locationFilter = 'searchCollectingLocation'
const locationFieldName = `locality.location|searchTags-${locationFilter}`

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
            name="locality.higherGeography|singleMatch-matchCollectingPlace"
            type="text"
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Field
            aggregationFunctionName="collectingLocations"
            autoComplete="off"
            component={MultipleSearchTagsSelectField}
            drillDownQuery={getDrilldownQuery(locationFieldName)}
            filterFunctionName={locationFilter}
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
