import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon } from 'semantic-ui-react'

import Section from '../../Section'

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  onGoToNextSection: PropTypes.func.isRequired,
  onGoToPreviousSection: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  customParts: undefined,
}

class FormSectionView extends PureComponent {
  constructor(props) {
    super(props)
    this.renderActiveSection = this.renderActiveSection.bind(this)
    this.renderAllSections = this.renderAllSections.bind(this)
  }

  renderActiveSection() {
    const {
      activeFormSectionIndex,
      changeFieldValue,
      customParts,
      formName,
      formValueSelector,
      removeArrayFieldByIndex,
      sectionSpecs,
    } = this.props

    const sectionSpec = sectionSpecs[activeFormSectionIndex]

    if (!sectionSpec) {
      throw new Error(
        `Missing form section with index ${activeFormSectionIndex}`
      )
    }

    const { name, units } = sectionSpec

    if (!units) {
      throw new Error(
        `Missing units for form section with index ${
          activeFormSectionIndex
        } with name ${name}`
      )
    }

    return (
      <Grid.Column width={16}>
        <Section
          changeFieldValue={changeFieldValue}
          customParts={customParts}
          formName={formName}
          formValueSelector={formValueSelector}
          module="collectionMammals"
          name={name}
          removeArrayFieldByIndex={removeArrayFieldByIndex}
          sectionSpec={sectionSpec}
        />
      </Grid.Column>
    )
  }

  renderAllSections() {
    const {
      changeFieldValue,
      customParts,
      formName,
      formValueSelector,
      removeArrayFieldByIndex,
      sectionSpecs,
    } = this.props

    return (
      <React.Fragment>
        {sectionSpecs.map(sectionSpec => {
          const { name, units } = sectionSpec

          if (!units) {
            throw new Error(`Missing unitSpecs for form section name ${name}`)
          }

          return (
            <Grid.Column key={name} width={16}>
              <Section
                changeFieldValue={changeFieldValue}
                customParts={customParts}
                formName={formName}
                formValueSelector={formValueSelector}
                module="collectionMammals"
                name={name}
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                sectionSpec={sectionSpec}
              />
            </Grid.Column>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const {
      activeFormSectionIndex,
      availableHeight: height,
      onGoToNextSection: handleGoToNextSection,
      onGoToPreviousSection: handleGoToPreviousSection,
      sectionSpecs,
      showAllFormSections,
    } = this.props

    return (
      <div
        className="ui fluid dina background"
        style={{
          height,
          overflow: 'auto',
        }}
      >
        <Grid className="text" container padded>
          {!showAllFormSections
            ? this.renderActiveSection()
            : this.renderAllSections()}

          {!showAllFormSections && (
            <Grid.Column textAlign="right" width={16}>
              <Button
                disabled={activeFormSectionIndex === 0}
                icon
                labelPosition="left"
                onClick={handleGoToPreviousSection}
                type="button"
              >
                <Icon name="left arrow" />
                Previous
              </Button>

              <Button
                disabled={activeFormSectionIndex === sectionSpecs.length - 1}
                icon
                labelPosition="right"
                onClick={handleGoToNextSection}
                type="button"
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </Grid.Column>
          )}
        </Grid>
      </div>
    )
  }
}

FormSectionView.propTypes = propTypes
FormSectionView.defaultProps = defaultProps

export default FormSectionView
