import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Icon } from 'semantic-ui-react'

import { ModuleTranslate } from 'coreModules/i18n/components'
import capitalizeFirstLetter from 'common/es5/stringFormatters/capitalizeFirstLetter'

const mapStateToProps = (state, { formValueSelector, name }) => {
  return {
    hasValues: !!Object.keys(formValueSelector(state, name) || {}).length,
  }
}

const propTypes = {
  hasValues: PropTypes.bool.isRequired,
  titleTextKey: PropTypes.string.isRequired,
}

const FilterTitle = ({ hasValues, titleTextKey }) => {
  return (
    <Grid>
      <Grid.Column width={14}>
        {hasValues && <Icon name="check circle" />}
        <ModuleTranslate
          fallback={capitalizeFirstLetter(titleTextKey)}
          module="collectionMammals"
          textKey={titleTextKey}
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
