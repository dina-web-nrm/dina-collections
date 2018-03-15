import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Accordion } from 'semantic-ui-react'

import createLog from 'utilities/log'
import curatedListSelectors from 'domainModules/curatedListService/globalSelectors'
import setAccordionActiveIndexAC from '../../../actionCreators/setAccordionActiveIndex'
import globalSelectors from '../../../globalSelectors'
import AccordionItem from './AccordionItem'

const log = createLog(
  'domainModules:collectionMammals:components:MammalForm:SegmentFeatureObservations:AccordionWrapper'
)

const mapStateToProps = (state, { groupsAndHeadlines }) => {
  const numberOfFeaturesPerGroup = groupsAndHeadlines.reduce(
    (groupHeadlineToNumberMap, { groups, headlineKey }) => {
      return {
        ...groupHeadlineToNumberMap,
        [headlineKey]: curatedListSelectors.getNumberOfFeatureObservationTypesInGroups(
          state,
          groups
        ),
      }
    },
    {}
  )

  const totalNumberOfFeatures = Object.values(numberOfFeaturesPerGroup).reduce(
    (acc, count) => acc + count,
    0
  )

  return {
    ...numberOfFeaturesPerGroup,
    activeIndex: globalSelectors.getAccordionActiveIndex(state, 'features'),
    totalNumberOfFeatures,
  }
}
const mapDispatchToProps = {
  setAccordionActiveIndex: setAccordionActiveIndexAC,
}

const propTypes = {
  activeIndex: PropTypes.number,
  changeFieldValue: PropTypes.func.isRequired,
  groupsAndHeadlines: PropTypes.arrayOf(
    PropTypes.shape({
      groups: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      headlineKey: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
  totalNumberOfFeatures: PropTypes.number.isRequired,
}
const defaultProps = {
  activeIndex: undefined,
}

class AccordionWrapper extends Component {
  componentWillMount() {
    // collapse all in edit mode
    if (this.props.mode === 'edit') {
      this.props.setAccordionActiveIndex({
        accordion: 'features',
        activeIndex: -1,
      })
    }
  }

  render() {
    const {
      activeIndex,
      changeFieldValue,
      groupsAndHeadlines,
      setAccordionActiveIndex,
      ...groupHeadlineToNumberMap
    } = this.props

    let tableRowIndexStart = 0

    log.render()
    return (
      <Accordion fluid styled>
        {groupsAndHeadlines.map(({ groups, headlineKey }, index) => {
          const component = (
            <AccordionItem
              active={activeIndex === index}
              changeFieldValue={changeFieldValue}
              groups={groups}
              headlineKey={headlineKey}
              index={index}
              key={headlineKey}
              setAccordionActiveIndex={setAccordionActiveIndex}
              tableRowIndexStart={tableRowIndexStart}
            />
          )
          const numberOfFeaturesInGroup = groupHeadlineToNumberMap[headlineKey]
          tableRowIndexStart += numberOfFeaturesInGroup

          return component
        })}
      </Accordion>
    )
  }
}

AccordionWrapper.propTypes = propTypes
AccordionWrapper.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AccordionWrapper
)
