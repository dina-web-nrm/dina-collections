import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Grid, Segment } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import {
  actionCreators as localityActionCreators,
  globalSelectors as localitySelectors,
} from 'dataModules/localityService'
import LocationInformationFields from './LocationInformationFields'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentIndividualCircumstances'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = state => {
  return {
    hasCuratedLocalities: localitySelectors.getHasCuratedLocalities(state),
  }
}
const mapDispatchToProps = {
  getCuratedLocalities: localityActionCreators.getCuratedLocalities,
}

const propTypes = {
  getCuratedLocalities: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  hasCuratedLocalities: PropTypes.bool.isRequired,
}

class SegmentIndividualCircumstances extends PureComponent {
  componentDidMount() {
    if (!config.isTest) {
      this.props.getCuratedLocalities()
    }
  }

  render() {
    const { getPath, hasCuratedLocalities } = this.props

    log.render()
    return (
      <Segment color="green" loading={!hasCuratedLocalities}>
        <Header size="medium">
          <ModuleTranslate textKey="collectingInformation" />
        </Header>
        <Grid textAlign="left" verticalAlign="top">
          {hasCuratedLocalities && <LocationInformationFields />}

          <Grid.Column computer={10} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="individualCircumstances"
                  textKey="collectorsText"
                />
              }
              module="collectionMammals"
              name={getPath('collectorsText')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={6} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="individualCircumstances"
                  textKey="expeditionText"
                />
              }
              module="collectionMammals"
              name={getPath('event.expeditionText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="individualCircumstances"
                  textKey="startDate"
                />
              }
              module="collectionMammals"
              name={getPath('event.startDate')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="individualCircumstances"
                  textKey="endDate"
                />
              }
              module="collectionMammals"
              name={getPath('event.endDate')}
              type="text"
            />
          </Grid.Column>
        </Grid>
      </Segment>
    )
  }
}

SegmentIndividualCircumstances.propTypes = propTypes

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  pathBuilder({ name: 'individualCircumstances.0' })
)(SegmentIndividualCircumstances)
