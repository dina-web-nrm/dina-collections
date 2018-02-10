import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import {
  Checkbox,
  InputDatePart,
  Field,
  Input,
} from 'coreModules/form/components'
import { DAY, MONTH, YEAR } from 'coreModules/form/constants'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import LocalityInformationFields from './LocalityInformationFields'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    occurrences: formValueSelector(state, 'occurrences'),
  }
}

const propTypes = {
  getPath: PropTypes.func.isRequired,
  occurrences: PropTypes.arrayOf(
    PropTypes.shape({
      dayStart: PropTypes.number,
      monthStart: PropTypes.number,
      yearStart: PropTypes.number,
    }).isRequired
  ),
}
const defaultProps = {
  occurrences: undefined,
}

function SegmentCollectingInformation({ occurrences, getPath }) {
  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate textKey="collectingInformation" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <LocalityInformationFields />

        <Grid.Column computer={10} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate scope="occurrences" textKey="collectorsText" />
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
              <ModuleTranslate scope="occurrences" textKey="expeditionText" />
            }
            module="collectionMammals"
            name={getPath('expeditionText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={2} mobile={4}>
          <Field
            autoComplete="off"
            component={InputDatePart}
            datePart={YEAR}
            label={<ModuleTranslate scope="occurrences" textKey="year" />}
            module="collectionMammals"
            name={getPath('yearStart')}
            type="numberAsText"
            value={occurrences && occurrences[0] && occurrences[0].yearStart}
          />
        </Grid.Column>
        <Grid.Column computer={2} mobile={4}>
          <Field
            autoComplete="off"
            component={InputDatePart}
            datePart={MONTH}
            label={<ModuleTranslate scope="occurrences" textKey="month" />}
            module="collectionMammals"
            name={getPath('monthStart')}
            type="numberAsText"
            value={occurrences && occurrences[0] && occurrences[0].monthStart}
          />
        </Grid.Column>
        <Grid.Column computer={2} mobile={4}>
          <Field
            autoComplete="off"
            component={InputDatePart}
            datePart={DAY}
            label={<ModuleTranslate scope="occurrences" textKey="day" />}
            module="collectionMammals"
            name={getPath('dayStart')}
            type="numberAsText"
            value={occurrences && occurrences[0] && occurrences[0].dayStart}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="occurrences"
                textKey="occurrenceDateText"
              />
            }
            module="collectionMammals"
            name={getPath('occurrenceDateText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={16} mobile={16}>
          <Field
            autoComplete="off"
            component={Checkbox}
            label={
              <ModuleTranslate scope="occurrences" textKey="isDeathEvent" />
            }
            module="collectionMammals"
            name={getPath('isDeathEvent')}
            type="checkbox"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="individualGroup"
                textKey="causeOfDeathStandardized"
              />
            }
            module="collectionMammals"
            name="causeOfDeathStandardized"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="individualGroup"
                textKey="causeOfDeathText"
              />
            }
            module="collectionMammals"
            name="causeOfDeathText"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="featureObservations"
                textKey="conditionAtCollecting"
              />
            }
            module="collectionMammals"
            // TODO: make this work so the index is dynamic and not colliding with other featureobservations
            name="featureObservations.0.featureObservationText"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="individualGroup"
                textKey="originStandardized"
              />
            }
            module="collectionMammals"
            name="originStandardized"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="occurrences"
                textKey="establishmentMeansStandardized"
              />
            }
            module="collectionMammals"
            name={getPath('establishmentMeansStandardized')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentCollectingInformation.propTypes = propTypes
SegmentCollectingInformation.defaultProps = defaultProps

export default compose(
  connect(mapStateToProps),
  pathBuilder({ name: 'occurrences.0' })
)(SegmentCollectingInformation)
