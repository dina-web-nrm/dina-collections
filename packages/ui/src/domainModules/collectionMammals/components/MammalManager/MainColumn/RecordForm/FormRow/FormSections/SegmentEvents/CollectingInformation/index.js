import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  Checkbox,
  DateRange,
  DropdownSearch,
  Field,
  Input,
} from 'coreModules/form/components'
import globalCrudSelectors from 'coreModules/crud/globalSelectors'
import { createEnsureAllItemsFetched } from 'coreModules/crud/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import i18nSelectors from 'coreModules/i18n/globalSelectors'
import { AdvancedAgentDropdownSearch } from 'domainModules/agent/components'
import { ALL } from 'domainModules/agent/constants'
import LocationInformationFields from './LocationInformationFields'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentCollectingInformation'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = state => {
  const currentLanguage = i18nSelectors.getLanguage(state)
  return {
    establishmentMeansTypeOptions: globalCrudSelectors.establishmentMeansType.getAllAsOptions(
      state,
      currentLanguage
    ),
  }
}

const propTypes = {
  allPlacesFetched: PropTypes.bool.isRequired,
  establishmentMeansTypeOptions: PropTypes.array.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
}

class SegmentCollectingInformation extends PureComponent {
  render() {
    const {
      allPlacesFetched,
      establishmentMeansTypeOptions,
      formValueSelector,
      getPath,
    } = this.props

    log.render()
    return (
      <React.Fragment>
        <Header size="medium">
          <ModuleTranslate capitalize textKey="headers.collectingInformation" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {allPlacesFetched && (
            <LocationInformationFields formValueSelector={formValueSelector} />
          )}

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={AdvancedAgentDropdownSearch}
              group={ALL}
              initialText="Choose"
              module="collectionMammals"
              name={getPath('collectedByAgent.id')}
            />
          </Grid.Column>
          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              module="collectionMammals"
              name={getPath('collectorsText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              module="collectionMammals"
              name={getPath('event.expeditionText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={4} mobile={16} tablet={4}>
            <Field
              autoComplete="off"
              component={DropdownSearch}
              module="collectionMammals"
              name={getPath('establishmentMeansType.id')}
              options={establishmentMeansTypeOptions}
              type="dropdown-search-local"
            />
          </Grid.Column>

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              module="collectionMammals"
              name={getPath('establishmentMeansN')}
              type="text"
            />
          </Grid.Column>

          <Grid.Row>
            <Grid.Column mobile={16}>
              <Header size="small">Collecting date</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16} mobile={16} tablet={8}>
              <DateRange
                autoComplete="off"
                displayText
                formName="mammalForm"
                module="collectionMammals"
                name={getPath('event.dateRange')}
                stack={false}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={4} mobile={16} tablet={4}>
              <Field
                autoComplete="off"
                component={Checkbox}
                inline
                module="collectionMammals"
                name={getPath('isDeathDate')}
                type="checkbox"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

SegmentCollectingInformation.propTypes = propTypes

export default compose(
  createEnsureAllItemsFetched({ resource: 'establishmentMeansType' }),
  pathBuilder({ name: 'individual.collectingInformation.0' }),
  connect(mapStateToProps)
)(SegmentCollectingInformation)
