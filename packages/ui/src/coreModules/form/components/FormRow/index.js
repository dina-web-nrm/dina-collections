import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import { pick } from 'lodash'

import createLog from 'utilities/log'
import { validateSections } from 'coreModules/formSupport/actionCreators'
import { ColumnLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { NAVIGATE_FORM_SECTION } from 'coreModules/resourceManager/constants'
import FormSectionNavigation, {
  propTypes as formSectionNavigationPropTypes,
} from './FormSectionNavigation'
import FormSectionView, {
  propTypes as formSectionViewPropTypes,
} from './FormSectionView'

const log = createLog('coreModules/form/components/FormRow')

const overflowAuto = { overflow: 'auto' }

const mapDispatchToProps = {
  push,
  validateSections,
}

const propTypes = {
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
  moduleName: PropTypes.string.isRequired,
  onInteraction: PropTypes.func,
  passthroughProps: PropTypes.arrayOf(PropTypes.string.isRequired),
  push: PropTypes.func.isRequired,
  sectionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  showSectionsInNavigation: PropTypes.bool,
  validateSections: PropTypes.func.isRequired,
}
const defaultProps = {
  customParts: undefined,
  itemSubHeader: undefined,
  onInteraction: undefined,
  passthroughProps: ['resourceActivities'],
  sectionId: undefined,
  showSectionsInNavigation: false,
}

class FormRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSetActiveFormSection = this.handleSetActiveFormSection.bind(this)
    this.handleGoToNextSection = this.handleGoToNextSection.bind(this)
    this.handleGoToPreviousSection = this.handleGoToPreviousSection.bind(this)
    this.handleShowAllFormSections = this.handleShowAllFormSections.bind(this)
  }

  componentDidMount() {
    const { formName } = this.props
    this.props.validateSections({ formName })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sectionId !== nextProps.sectionId) {
      const { formName } = this.props
      this.props.validateSections({ formName })
    }
  }

  handleSetActiveFormSection(event, newSectionId) {
    if (event) event.preventDefault()

    this.props.onInteraction(NAVIGATE_FORM_SECTION, { sectionId: newSectionId })
  }

  handleGoToNextSection(event) {
    const { sectionId, sectionSpecs } = this.props
    const numericSectionId = Number(sectionId)

    if (
      Number.isInteger(numericSectionId) &&
      numericSectionId < sectionSpecs.length - 1
    ) {
      this.handleSetActiveFormSection(event, numericSectionId + 1)
    }
  }

  handleGoToPreviousSection(event) {
    const { sectionId } = this.props
    const numericSectionId = Number(sectionId)

    if (Number.isInteger(numericSectionId) && numericSectionId > 0) {
      this.handleSetActiveFormSection(event, numericSectionId - 1)
    }
  }

  handleShowAllFormSections(event) {
    this.handleSetActiveFormSection(event, 'all')
  }

  render() {
    log.render()
    const { sectionId, showSectionsInNavigation } = this.props

    if (showSectionsInNavigation && sectionId === undefined) {
      return null
    }

    const activeFormSectionIndex = Number(sectionId)

    return (
      <ColumnLayout>
        <ColumnLayout.Column width={emToPixels(25)}>
          <FormSectionNavigation
            {...pick(this.props, [
              'itemHeader',
              'itemSubHeader',
              ...Object.keys(formSectionNavigationPropTypes),
              ...this.props.passthroughProps,
            ])}
            activeFormSectionIndex={activeFormSectionIndex}
            onSetActiveFormSection={this.handleSetActiveFormSection}
            onShowAllFormSections={this.handleShowAllFormSections}
          />
        </ColumnLayout.Column>
        <ColumnLayout.Column style={overflowAuto}>
          <FormSectionView
            {...pick(this.props, [
              'itemHeader',
              'itemSubHeader',
              ...Object.keys(formSectionViewPropTypes),
              ...this.props.passthroughProps,
            ])}
            activeFormSectionIndex={activeFormSectionIndex}
            onGoToNextSection={this.handleGoToNextSection}
            onGoToPreviousSection={this.handleGoToPreviousSection}
            showAllFormSections={sectionId === 'all'}
          />
        </ColumnLayout.Column>
      </ColumnLayout>
    )
  }
}

FormRow.propTypes = propTypes
FormRow.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(
    undefined,
    mapDispatchToProps
  )
)(FormRow)
