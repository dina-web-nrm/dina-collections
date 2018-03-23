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
import specimenSelectors from 'domainModules/specimenService/globalSelectors'
import DeterminationContent from './DeterminationContent'
import DeterminationTitle from './DeterminationTitle'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations'
)

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector, specimenId }) => {
  return {
    hasSpecimen: !!(
      specimenId && specimenSelectors.getSpecimen(state, specimenId)
    ),
    isSmallScreen: sizeSelectors.getIsSmall(state),
    taxonInformation: formValueSelector(state, 'taxonInformation'),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  hasSpecimen: PropTypes.bool.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  taxonInformation: PropTypes.shape({
    curatorialName: PropTypes.string,
    determinations: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        determinedByAgentText: PropTypes.string,
        isCurrentDetermination: PropTypes.bool,
        remarks: PropTypes.string,
        taxonNameStandardized: PropTypes.string,
      })
    ).isRequired,
  }),
}
const defaultProps = {
  taxonInformation: { determinations: [] },
}

const SegmentDeterminations = ({
  taxonInformation,
  changeFieldValue,
  formValueSelector,
  isSmallScreen,
  removeArrayFieldByIndex,
  editMode,
  hasSpecimen,
}) => {
  const { determinations } = taxonInformation
  const renderAccordion = !editMode || (editMode && hasSpecimen)

  log.render()
  return (
    <Segment color="green" loading={!renderAccordion}>
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
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
                `taxonInformation.determinations.${determinations.length}`,
                {}
              )
            }}
          >
            <ModuleTranslate scope="determination" textKey="addDetermination" />
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentDeterminations.propTypes = propTypes
SegmentDeterminations.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentDeterminations)
