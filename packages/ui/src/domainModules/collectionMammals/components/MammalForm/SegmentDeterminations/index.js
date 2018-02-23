import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import sizeSelectors from 'coreModules/size/globalSelectors'
import setAccordionActiveIndexAC from '../../../actionCreators/setAccordionActiveIndex'
import AccordionWrapper from './AccordionWrapper'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    isSmallScreen: sizeSelectors.getIsSmall(state),
    taxonInformation: formValueSelector(state, 'taxonInformation'),
  }
}
const mapDispatchToProps = {
  setAccordionActiveIndex: setAccordionActiveIndexAC,
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
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
  mode,
  removeArrayFieldByIndex,
  setAccordionActiveIndex,
}) => {
  const { determinations } = taxonInformation

  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column mobile={16}>
          <AccordionWrapper
            changeFieldValue={changeFieldValue}
            determinations={determinations}
            formValueSelector={formValueSelector}
            isSmallScreen={isSmallScreen}
            mode={mode}
            removeArrayFieldByIndex={removeArrayFieldByIndex}
            setAccordionActiveIndex={setAccordionActiveIndex}
          />
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Button
            onClick={event => {
              event.preventDefault()
              changeFieldValue(
                `taxonInformation.determinations.${determinations.length}`,
                {}
              )
              setAccordionActiveIndex({
                accordion: 'determinations',
                activeIndex: determinations.length,
              })
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  SegmentDeterminations
)
