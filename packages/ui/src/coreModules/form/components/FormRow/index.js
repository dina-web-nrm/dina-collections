import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import objectPath from 'object-path'

import createLog from 'utilities/log'
import extractProps from 'utilities/extractProps'
import {
  actionCreators as formSupportKeyObjectActionCreators,
  globalSelectors as formSupportKeyObjectSelectors,
} from 'coreModules/formSupport/keyObjectModule'
import { ColumnLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
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

const mapStateToProps = (state, { formName, match }) => {
  return {
    activeFormSectionIndex: formSupportKeyObjectSelectors.get[
      'sectionNavigation.:formName.activeFormSectionIndex'
    ](state, { formName }),
    sectionId: objectPath.get(match, 'params.sectionId'),
    showAllFormSections: formSupportKeyObjectSelectors.get[
      'sectionNavigation.:formName.showAllFormSections'
    ](state, {
      formName,
    }),
  }
}
const mapDispatchToProps = {
  push,
  setActiveFormSectionIndex:
    formSupportKeyObjectActionCreators.set[
      'sectionNavigation.:formName.activeFormSectionIndex'
    ],
  setShowAllFormSections:
    formSupportKeyObjectActionCreators.set[
      'sectionNavigation.:formName.showAllFormSections'
    ],
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  customParts: PropTypes.objectOf(PropTypes.func.isRequired),
  formName: PropTypes.string.isRequired,
  formSectionNavigationHeader: PropTypes.node.isRequired,
  formSectionNavigationSubHeader: PropTypes.node,
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  moduleName: PropTypes.string.isRequired,
  passthroughProps: PropTypes.arrayOf(PropTypes.string.isRequired),
  push: PropTypes.func.isRequired,
  resourceIdPathParamKey: PropTypes.string,
  sectionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  setActiveFormSectionIndex: PropTypes.func.isRequired,
  setShowAllFormSections: PropTypes.func.isRequired,
  showAllFormSections: PropTypes.bool,
  showSectionsInNavigation: PropTypes.bool,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  customParts: undefined,
  formSectionNavigationSubHeader: undefined,
  passthroughProps: ['resourceActivities'],
  resourceIdPathParamKey: 'itemId',
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
      this.props.setActiveFormSectionIndex(sectionIndex, { formName })
      this.props.setShowAllFormSections(false, { formName })
    } else if (sectionId === 'all') {
      this.props.setActiveFormSectionIndex(null, { formName })
      this.props.setShowAllFormSections(true, { formName })
    }
  }

  handleSetActiveFormSection(event, activeFormSectionIndex) {
    if (event) event.preventDefault()

    const { resourceIdPathParamKey } = this.props
    const { path, params } = this.props.match

    const url = path
      .replace(`:${resourceIdPathParamKey}`, params[resourceIdPathParamKey])
      .replace(':sectionId', activeFormSectionIndex)

    this.props.push(url)
  }

  handleGoToNextSection(event) {
    const { activeFormSectionIndex, sectionSpecs } = this.props

    if (activeFormSectionIndex < sectionSpecs.length - 1) {
      this.handleSetActiveFormSection(event, activeFormSectionIndex + 1)
    }
  }

  handleGoToPreviousSection(event) {
    const { activeFormSectionIndex } = this.props

    if (activeFormSectionIndex > 0) {
      this.handleSetActiveFormSection(event, activeFormSectionIndex - 1)
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

        const {
          formSectionNavigationHeader,
          formSectionNavigationSubHeader,
        } = this.props

        return (
          <FormSectionNavigation
            {...extractedProps}
            header={formSectionNavigationHeader}
            subHeader={formSectionNavigationSubHeader}
          />
        )
      }

      case 'formSectionView': {
        const { extractedProps } = extractProps({
          keys: [
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
      activeFormSectionIndex,
      customParts,
      match,
      moduleName,
      sectionSpecs,
      showAllFormSections,
      showSectionsInNavigation,
      ...rest
    } = this.props

    if (
      showSectionsInNavigation &&
      activeFormSectionIndex === undefined &&
      showAllFormSections === undefined
    ) {
      return null
    }

    return (
      <React.Fragment>
        <ColumnLayout
          {...rest}
          activeFormSectionIndex={activeFormSectionIndex}
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
          specimenId={match.params.specimenId}
        />
      </React.Fragment>
    )
  }
}

FormRow.propTypes = propTypes
FormRow.defaultProps = defaultProps

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(FormRow)
