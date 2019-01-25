import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'
import { isEqual } from 'lodash'

import { ModuleTranslate } from 'coreModules/i18n/components'
import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'

const mapStateToProps = (
  state,
  {
    doDeepEqualInitialValuesComparison,
    formValueSelector,
    getFormInitialValues,
    name,
  }
) => {
  const initialFormValues = getFormInitialValues(state)
  const initialSectionValues = initialFormValues && initialFormValues[name]
  const sectionValues = formValueSelector(state, name)

  return {
    hasChanged: doDeepEqualInitialValuesComparison
      ? !isEqual(initialSectionValues, sectionValues)
      : initialSectionValues !== sectionValues,
    hasValues: !!Object.keys(sectionValues || {}).length,
  }
}

const propTypes = {
  hasChanged: PropTypes.bool.isRequired,
  hasValues: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}

const FilterTitle = ({ hasChanged, hasValues, name }) => {
  return (
    <Grid>
      <Grid.Column width={14}>
        {hasValues && hasChanged && <Icon name="check circle" />}
        <ModuleTranslate
          fallback={capitalizeFirstLetter(name)}
          module="collectionMammals"
          textKey={`filterTitles.${name}`}
        />
      </Grid.Column>
      <Grid.Column width={2}>
        <Icon name="dropdown" />
      </Grid.Column>
    </Grid>
  )
}

FilterTitle.propTypes = propTypes

export default connect(mapStateToProps)(FilterTitle)
