import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import createLog from 'utilities/log'
import { ColumnLayout } from 'coreModules/layout/components'
import { emToPixels } from 'coreModules/layout/utilities'
import { globalSelectors as keyObjectSelectors } from 'domainModules/collectionMammals/keyObjectModule'
import FormSectionNavigation from './FormSectionNavigation'
import FormSectionView from './FormSectionView'

const log = createLog(
  'modules:collectionMammals::MammalManager:RecordForm:FormRow'
)

const formSectionNavigation = {
  key: 'formSectionNavigation',
  renderColumn: props => <FormSectionNavigation {...props} />,
  width: emToPixels(25),
}

const formSectionView = {
  key: 'formSectionView',
  renderColumn: props => <FormSectionView {...props} />,
}

const columns = [formSectionNavigation, formSectionView]

const mapStateToProps = state => {
  return {
    activeFormSectionIndex: keyObjectSelectors.get.activeFormSectionIndex(
      state
    ),
    showAllFormSections: keyObjectSelectors.get.showAllFormSections(state),
  }
}
const mapDispatchToProps = {
  push,
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  match: PropTypes.shape({
    params: PropTypes.shape({
      specimenId: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  push: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }).isRequired
  ).isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
}

class FormRow extends PureComponent {
  constructor(props) {
    super(props)
    this.handleSetActiveFormSection = this.handleSetActiveFormSection.bind(this)
    this.handleGoToNextSection = this.handleGoToNextSection.bind(this)
    this.handleGoToPreviousSection = this.handleGoToPreviousSection.bind(this)
    this.handleShowAllFormSections = this.handleShowAllFormSections.bind(this)
  }

  handleSetActiveFormSection(event, activeFormSectionIndex) {
    if (event) event.preventDefault()

    const { path, params } = this.props.match

    const url = path
      .replace(':specimenId', params.specimenId)
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

  render() {
    log.render()
    const {
      activeFormSectionIndex,
      match,
      sectionSpecs,
      showAllFormSections,
      ...rest
    } = this.props

    return (
      <React.Fragment>
        <ColumnLayout
          {...rest}
          activeFormSectionIndex={activeFormSectionIndex}
          columns={columns}
          onGoToNextSection={this.handleGoToNextSection}
          onGoToPreviousSection={this.handleGoToPreviousSection}
          onRemoteSubmit={this.handleRemoteSubmit}
          onSetActiveFormSection={this.handleSetActiveFormSection}
          onShowAllFormSections={this.handleShowAllFormSections}
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
