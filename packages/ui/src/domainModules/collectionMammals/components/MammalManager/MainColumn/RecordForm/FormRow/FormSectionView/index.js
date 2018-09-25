import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon } from 'semantic-ui-react'

import { Section } from 'coreModules/form/components'
import sectionSpecs from '../sectionSpecs'
import unitSpecs from '../unitSpecs'

const customParts = {}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  formSections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  formValueSelector: PropTypes.func.isRequired,
  onGoToNextSection: PropTypes.func.isRequired,
  onGoToPreviousSection: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
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
      formName,
      formSections,
      formValueSelector,
      removeArrayFieldByIndex,
    } = this.props

    const formSection = formSections[activeFormSectionIndex]

    if (!formSection) {
      throw new Error(
        `Missing form section with index ${activeFormSectionIndex}`
      )
    }

    const { name } = formSection

    if (!(name && sectionSpecs[name])) {
      throw new Error(
        `Missing sectionSpecs for form section index ${
          activeFormSectionIndex
        } with name ${name}`
      )
    }

    return (
      <Grid.Column width={16}>
        <Section
          changeFieldValue={changeFieldValue}
          childSpecs={sectionSpecs[name]}
          customParts={customParts}
          formName={formName}
          formValueSelector={formValueSelector}
          module="collectionMammals"
          name={name}
          removeArrayFieldByIndex={removeArrayFieldByIndex}
          unitSpecs={unitSpecs}
        />
      </Grid.Column>
    )
  }

  renderAllSections() {
    const {
      changeFieldValue,
      formName,
      formSections,
      formValueSelector,
      removeArrayFieldByIndex,
    } = this.props

    return (
      <React.Fragment>
        {formSections.map(({ name }) => {
          if (!(name && sectionSpecs[name])) {
            throw new Error(
              `Missing sectionSpecs for form section name ${name}`
            )
          }

          return (
            <Grid.Column key={name} width={16}>
              <Section
                changeFieldValue={changeFieldValue}
                childSpecs={sectionSpecs[name]}
                customParts={customParts}
                formName={formName}
                formValueSelector={formValueSelector}
                module="collectionMammals"
                name={name}
                removeArrayFieldByIndex={removeArrayFieldByIndex}
                unitSpecs={unitSpecs}
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
      formSections,
      onGoToNextSection: handleGoToNextSection,
      onGoToPreviousSection: handleGoToPreviousSection,
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
                disabled={activeFormSectionIndex === formSections.length - 1}
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
