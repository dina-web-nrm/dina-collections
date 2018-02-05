import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Accordion } from 'semantic-ui-react'

import sizeSelectors from 'coreModules/size/globalSelectors'
import globalSelectors from '../../../globalSelectors'
import AccordionItem from './AccordionItem'

const mapStateToProps = state => {
  return {
    activeIndex: globalSelectors.getAccordionActiveIndex(
      state,
      'determinations'
    ),
    isSmallScreen: sizeSelectors.getIsSmall(state),
  }
}

const propTypes = {
  activeIndex: PropTypes.number,
  changeFieldValue: PropTypes.func.isRequired,
  expandAll: PropTypes.bool,
  formValueSelector: PropTypes.func.isRequired,
  identifications: PropTypes.arrayOf(
    PropTypes.shape({
      identifiedTaxonNameStandardized: PropTypes.string,
    })
  ).isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(['edit', 'register']).isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  // for testing purposes, to bypass popup that is not possible (?) to select in enzyme
  requireRemoveDeterminationConfirmation: PropTypes.bool,
  setAccordionActiveIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  activeIndex: undefined,
  expandAll: false,
  requireRemoveDeterminationConfirmation: process.env.NODE_ENV !== 'test',
}

class AccordionWrapper extends Component {
  componentWillMount() {
    // collapse all in edit mode
    if (this.props.mode === 'edit') {
      this.props.setAccordionActiveIndex({
        accordion: 'determinations',
        activeIndex: -1,
      })
    }
  }

  render() {
    const {
      activeIndex,
      changeFieldValue,
      expandAll,
      formValueSelector,
      identifications,
      isSmallScreen,
      removeArrayFieldByIndex,
      requireRemoveDeterminationConfirmation,
      setAccordionActiveIndex,
    } = this.props

    return (
      <Accordion fluid styled>
        {identifications &&
          identifications.map((identification, index) => {
            return (
              <AccordionItem
                active={
                  expandAll ||
                  (activeIndex === undefined
                    ? index === 0
                    : index === activeIndex)
                }
                changeFieldValue={changeFieldValue}
                formValueSelector={formValueSelector}
                identification={identification}
                index={index}
                isSmallScreen={isSmallScreen}
                key={index} // eslint-disable-line react/no-array-index-key
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                requireRemoveDeterminationConfirmation={
                  requireRemoveDeterminationConfirmation
                }
                setAccordionActiveIndex={setAccordionActiveIndex}
              />
            )
          })}
      </Accordion>
    )
  }
}

AccordionWrapper.propTypes = propTypes
AccordionWrapper.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(AccordionWrapper)
