import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import config from 'config'
import createLog from 'utilities/log'
import { Accordion } from 'coreModules/commonUi/components'
import { FIRST_EXPANDED } from 'coreModules/commonUi/constants'
import { createModuleTranslate } from 'coreModules/i18n/components'
import sizeSelectors from 'coreModules/size/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { CustomData, Field, Input } from 'coreModules/form/components'
import DeterminationContent from './DeterminationContent'
import DeterminationTitle from './DeterminationTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector, specimenId }) => {
  return {
    determinations: formValueSelector(state, 'individual.determinations'),
    hasSpecimen: !!(
      specimenId && crudSelectors.specimen.getOne(state, specimenId)
    ),
    isSmallScreen: sizeSelectors.getIsSmall(state),
    taxonInformation: formValueSelector(state, 'individual.taxonInformation'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  determinations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.object,
      determinedByAgentText: PropTypes.string,
      remarks: PropTypes.string,
      taxonNameStandardized: PropTypes.string,
    })
  ).isRequired,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  hasSpecimen: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  taxonInformation: PropTypes.shape({
    curatorialTaxonNameText: PropTypes.string,
  }),
}
const defaultProps = {
  taxonInformation: {},
}

const SegmentDeterminations = ({
  changeFieldValue,
  determinations,
  editMode,
  formValueSelector,
  getPath,
  hasSpecimen,
  isSmallScreen,
  removeArrayFieldByIndex,
}) => {
  const renderAccordion = !editMode || (editMode && hasSpecimen)

  log.render()
  return (
    <Segment color="green" loading={!renderAccordion}>
      <Header size="medium">Taxon</Header>

      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={4} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label="Curatorial name"
              module="collectionMammals"
              name={getPath(
                'individual.taxonInformation.curatorialTaxonNameText'
              )}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={5} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label="Taxon remarks"
              module="collectionMammals"
              name={getPath('individual.taxonInformation.taxonRemarks')}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={16}>
            <Header size="medium">Determinations</Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Column mobile={16}>
          {renderAccordion && (
            <Accordion
              initialActiveMode={FIRST_EXPANDED}
              items={determinations}
              renderContent={props => (
                <DeterminationContent
                  changeFieldValue={changeFieldValue}
                  formValueSelector={formValueSelector}
                  isSmallScreen={isSmallScreen}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                  skipRemoveDeterminationConfirmation={config.isTest}
                  {...props}
                />
              )}
              renderTitle={({ index, ...rest }) => (
                <DeterminationTitle
                  {...determinations[index] || {}}
                  {...rest}
                />
              )}
              skipRemoveDeterminationConfirmation={config.isTest}
            />
          )}
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Button
            onClick={event => {
              event.preventDefault()
              changeFieldValue(
                `individual.determinations.${determinations.length}`,
                {}
              )
            }}
          >
            <ModuleTranslate scope="determination" textKey="addDetermination" />
          </Button>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={CustomData}
              label="Read only"
              module="collectionMammals"
              name="readOnly"
              type="read-only"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

SegmentDeterminations.propTypes = propTypes
SegmentDeterminations.defaultProps = defaultProps

export default compose(connect(mapStateToProps), pathBuilder())(
  SegmentDeterminations
)
