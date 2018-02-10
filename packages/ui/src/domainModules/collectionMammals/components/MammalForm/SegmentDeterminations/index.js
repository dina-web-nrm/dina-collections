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
    identifications: formValueSelector(state, 'identifications'),
    isSmallScreen: sizeSelectors.getIsSmall(state),
  }
}
const mapDispatchToProps = {
  setAccordionActiveIndex: setAccordionActiveIndexAC,
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  identifications: PropTypes.arrayOf(
    PropTypes.shape({
      identifiedTaxonNameStandardized: PropTypes.string,
    })
  ).isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
}

const SegmentDeterminations = ({
  changeFieldValue,
  formValueSelector,
  identifications,
  isSmallScreen,
  mode,
  removeArrayFieldByIndex,
  setAccordionActiveIndex,
}) => {
  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column mobile={16}>
          <AccordionWrapper
            changeFieldValue={changeFieldValue}
            formValueSelector={formValueSelector}
            identifications={identifications}
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
              changeFieldValue(`identifications.${identifications.length}`, {})
              setAccordionActiveIndex({
                accordion: 'determinations',
                activeIndex: identifications.length,
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  SegmentDeterminations
)
