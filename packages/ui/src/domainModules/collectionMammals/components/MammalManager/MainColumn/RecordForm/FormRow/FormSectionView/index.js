import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, Icon } from 'semantic-ui-react'

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  formSections: PropTypes.arrayOf(
    PropTypes.shape({
      Component: PropTypes.func.isRequired,
    }).isRequired
  ).isRequired,
  onGoToNextSection: PropTypes.func.isRequired,
  onGoToPreviousSection: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
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
    const { activeFormSectionIndex, formSections } = this.props

    const formSection = formSections[activeFormSectionIndex]

    if (!formSection) {
      throw new Error(
        `Missing form section with index ${activeFormSectionIndex}`
      )
    }

    const { Component } = formSection

    if (!Component) {
      throw new Error(
        `Missing component for form section index ${
          activeFormSectionIndex
        } with name ${formSection.name}`
      )
    }

    return (
      <Grid.Column width={16}>
        <Component {...this.props} />
      </Grid.Column>
    )
  }

  renderAllSections() {
    const { formSections } = this.props

    return (
      <React.Fragment>
        {formSections.map(({ Component, name }) => {
          if (!Component) {
            throw new Error(
              `Missing component for form section with name ${name}`
            )
          }

          return (
            <Grid.Column key={name} width={16}>
              <Component {...this.props} />
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
        <Grid padded style={{ maxWidth: 1000 }}>
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
