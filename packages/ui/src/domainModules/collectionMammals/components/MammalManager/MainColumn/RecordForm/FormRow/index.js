import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'

import createLog from 'utilities/log'
import { KeyboardShortcuts } from 'coreModules/keyboardShortcuts/components'
import { ColumnLayout } from 'coreModules/layout/components'
import { globalSelectors as keyObjectSelectors } from 'domainModules/collectionMammals/keyObjectModule'
import FormSectionNavigation from './FormSectionNavigation'
import FormSectionView from './FormSectionView'

const log = createLog(
  'modules:collectionMammals::MammalManager:RecordForm:FormRow'
)

const formSections = [
  {
    name: 'basicInformation',
  },
]

const formSectionNavigation = {
  key: 'formSectionNavigation',
  renderColumn: props => <FormSectionNavigation {...props} />,
  width: '200px',
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

    this.shortcuts = [
      {
        command: 'left',
        description: 'Go to previous form section',
        onPress: this.handleGoToPreviousSection,
      },
      {
        command: 'right',
        description: 'Go to next form section',
        onPress: this.handleGoToNextSection,
      },
    ]
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
    const { activeFormSectionIndex } = this.props

    if (activeFormSectionIndex < formSections.length - 1) {
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
      showAllFormSections,
      ...rest
    } = this.props

    return (
      <React.Fragment>
        <KeyboardShortcuts shortcuts={this.shortcuts} />
        <ColumnLayout
          {...rest}
          activeFormSectionIndex={activeFormSectionIndex}
          columns={columns}
          formSections={formSections}
          onGoToNextSection={this.handleGoToNextSection}
          onGoToPreviousSection={this.handleGoToPreviousSection}
          onRemoteSubmit={this.handleRemoteSubmit}
          onSetActiveFormSection={this.handleSetActiveFormSection}
          onShowAllFormSections={this.handleShowAllFormSections}
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
