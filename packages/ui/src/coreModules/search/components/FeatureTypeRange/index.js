import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import TagTypeDropdown from '../TagTypeDropdown'

const propTypes = {
  buildLocalAggregationQuery: PropTypes.func.isRequired,
  disableClearUnitValue: PropTypes.bool,
  module: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  tagTypeDropdownPlaceholder: PropTypes.string,
  tagTypeInitialOptionValue: PropTypes.string,
  tagTypeInlineDescription: PropTypes.node,
  tagTypeMatchAllOptionText: PropTypes.string,
  unitOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}
const defaultProps = {
  disableClearUnitValue: undefined,
  tagTypeDropdownPlaceholder: undefined,
  tagTypeInitialOptionValue: undefined,
  tagTypeInlineDescription: undefined,
  tagTypeMatchAllOptionText: undefined,
}

const FeatureTypeRange = ({
  buildLocalAggregationQuery,
  disableClearUnitValue,
  module,
  name: baseName,
  resource,
  search,
  tagTypeDropdownPlaceholder,
  tagTypeInitialOptionValue,
  tagTypeInlineDescription,
  tagTypeMatchAllOptionText,
  unitOptions,
}) => {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Row>
        <Grid.Column width={16}>
          <Field
            autoComplete="off"
            buildLocalAggregationQuery={buildLocalAggregationQuery}
            component={TagTypeDropdown}
            inline
            inlineDescription={tagTypeInlineDescription}
            module={module}
            name={`${baseName}.rangeType`}
            placeholder={tagTypeDropdownPlaceholder}
            resource={resource}
            search={search}
            tagTypeInitialOptionValue={tagTypeInitialOptionValue}
            tagTypeMatchAllOptionText={tagTypeMatchAllOptionText}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Field
            autoComplete="off"
            component={Input}
            enableHelpNotifications={false}
            fluid
            label="from"
            min={0}
            module={module}
            name={`${baseName}.rangeValue.min`}
            subLabel
            type="number"
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Field
            autoComplete="off"
            component={Input}
            enableHelpNotifications={false}
            fluid
            label="to"
            min={0}
            module={module}
            name={`${baseName}.rangeValue.max`}
            subLabel
            type="number"
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Field
            autoComplete="off"
            component={DropdownSearch}
            disableClearValue={disableClearUnitValue}
            enableHelpNotifications={false}
            fluid
            label="unit"
            module={module}
            name={`${baseName}.rangeUnit`}
            options={unitOptions}
            subLabel
            type="dropdown-search-local"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

FeatureTypeRange.propTypes = propTypes
FeatureTypeRange.defaultProps = defaultProps

export default FeatureTypeRange
