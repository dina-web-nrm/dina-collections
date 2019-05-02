import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import createLog from 'utilities/log'
import extractProps from 'utilities/extractProps'
import { validateSections } from 'coreModules/formSupport/actionCreators'
import {
  actionCreators as formSupportKeyObjectActionCreators,
  globalSelectors as formSupportKeyObjectSelectors,
} from 'coreModules/formSupport/keyObjectModule'
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

const columns = [
  { key: 'formSectionNavigation', width: emToPixels(25) },
  { key: 'formSectionView', style: { overflow: 'auto' } },
]

const mapStateToProps = (state, { formName }) => {
  return {
    showAllFormSections: formSupportKeyObjectSelectors.get[
      'sectionNavigation.:formName.showAllFormSections'
    ](state, {
      formName,
    }),
  }
}
const mapDispatchToProps = {
  push,
  setShowAllFormSections:
    formSupportKeyObjectActionCreators.set[
      'sectionNavigation.:formName.showAllFormSections'
    ],
  validateSections,
}

const propTypes = {
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
  moduleName: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  passthroughProps: PropTypes.arrayOf(PropTypes.string.isRequired),
  push: PropTypes.func.isRequired,
  sectionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  setShowAllFormSections: PropTypes.func.isRequired,
  showAllFormSections: PropTypes.bool,
  showSectionsInNavigation: PropTypes.bool,
  validateSections: PropTypes.func.isRequired,
}
const defaultProps = {
  customParts: undefined,
  itemSubHeader: undefined,
  passthroughProps: ['resourceActivities'],
  sectionId: undefined,
  showAllFormSections: undefined,
  showSectionsInNavigation: false,
}

class FormRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSectionIdUpdate = this.handleSectionIdUpdate.bind(this)
    this.handleSetActiveFormSection = this.handleSetActiveFormSection.bind(this)
    this.handleGoToNextSection = this.handleGoToNextSection.bind(this)
    this.handleGoToPreviousSection = this.handleGoToPreviousSection.bind(this)
    this.handleShowAllFormSections = this.handleShowAllFormSections.bind(this)
    this.renderColumn = this.renderColumn.bind(this)
  }

  componentWillMount() {
    this.handleSectionIdUpdate()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sectionId !== nextProps.sectionId) {
      this.handleSectionIdUpdate(nextProps)
    }
  }

  handleSectionIdUpdate(props = this.props) {
    const { formName, sectionId } = props
    const sectionIndex = Number(sectionId)

    if (Number.isInteger(sectionIndex)) {
      this.props.setShowAllFormSections(false, { formName })
    } else if (sectionId === 'all') {
      this.props.setShowAllFormSections(true, { formName })
    }

    setTimeout(() => this.props.validateSections({ formName: props.formName }))
  }

  handleSetActiveFormSection(event, newSectionId) {
    if (event) event.preventDefault()

    this.props.onInteraction(NAVIGATE_FORM_SECTION, { sectionId: newSectionId })
  }

  handleGoToNextSection(event) {
    const { sectionId, sectionSpecs } = this.props

    if (sectionId < sectionSpecs.length - 1) {
      this.handleSetActiveFormSection(event, sectionId + 1)
    }
  }

  handleGoToPreviousSection(event) {
    const { sectionId } = this.props

    if (sectionId > 0) {
      this.handleSetActiveFormSection(event, sectionId - 1)
    }
  }

  handleShowAllFormSections(event) {
    this.handleSetActiveFormSection(event, 'all')
  }

  renderColumn(key, props) {
    switch (key) {
      case 'formSectionNavigation': {
        const { extractedProps } = extractProps({
          keys: [
            ...Object.keys(formSectionNavigationPropTypes),
            ...this.props.passthroughProps,
          ],
          props,
        })

        const { itemHeader, itemSubHeader } = this.props

        return (
          <FormSectionNavigation
            {...extractedProps}
            header={itemHeader}
            subHeader={itemSubHeader}
          />
        )
      }

      case 'formSectionView': {
        const { extractedProps } = extractProps({
          keys: [
            'itemHeader',
            'itemSubHeader',
            ...Object.keys(formSectionViewPropTypes),
            ...this.props.passthroughProps,
          ],
          props,
        })

        return <FormSectionView {...extractedProps} />
      }

      default: {
        throw new Error(`Unknown column: ${key}`)
      }
    }
  }

  render() {
    log.render()
    const {
      customParts,
      moduleName,
      sectionId,
      sectionSpecs,
      showAllFormSections,
      showSectionsInNavigation,
      ...rest
    } = this.props
    if (
      sectionId === undefined &&
      showSectionsInNavigation &&
      showAllFormSections === undefined
    ) {
      return null
    }

    return (
      <React.Fragment>
        <ColumnLayout
          {...rest}
          activeFormSectionIndex={sectionId}
          columns={columns}
          customParts={customParts}
          moduleName={moduleName}
          onGoToNextSection={this.handleGoToNextSection}
          onGoToPreviousSection={this.handleGoToPreviousSection}
          onRemoteSubmit={this.handleRemoteSubmit}
          onSetActiveFormSection={this.handleSetActiveFormSection}
          onShowAllFormSections={this.handleShowAllFormSections}
          renderColumn={this.renderColumn}
          sectionSpecs={sectionSpecs}
          showAllFormSections={showAllFormSections}
          showSectionsInNavigation={showSectionsInNavigation}
        />
      </React.Fragment>
    )
  }
}

FormRow.propTypes = propTypes
FormRow.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FormRow)
