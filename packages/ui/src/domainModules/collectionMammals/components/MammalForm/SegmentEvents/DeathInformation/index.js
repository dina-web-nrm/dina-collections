import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import createLog from 'utilities/log'
import { DropdownSearch, Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import i18nSelectors from 'coreModules/i18n/globalSelectors'

const log = createLog('modules:collectionMammals:MammalForm:DeathInformation')

const mapStateToProps = state => {
  const currentLanguage = i18nSelectors.getLanguage(state)
  return {
    causeOfDeathTypeOptions: globalCrudSelectors.causeOfDeathType.getAllAsOptions(
      state,
      currentLanguage
    ),
  }
}

const propTypes = {
  causeOfDeathTypeOptions: PropTypes.array.isRequired,
  getPath: PropTypes.func.isRequired,
}

class DeathInformation extends PureComponent {
  render() {
    const { causeOfDeathTypeOptions, getPath } = this.props
    log.render()
    return (
      <React.Fragment>
        <Header size="medium">Death information</Header>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={DropdownSearch}
              label="Cause of death"
              module="collectionMammals"
              name={getPath('causeOfDeathType.id')}
              options={causeOfDeathTypeOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label="Remarks"
              module="collectionMammals"
              name={getPath('remarks')}
              type="text"
            />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

DeathInformation.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({ resource: 'causeOfDeathType' }),
  pathBuilder({ name: 'individual.deathInformation.0' }),
  connect(mapStateToProps)
)(DeathInformation)
