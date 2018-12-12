import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Step } from 'semantic-ui-react'

import config from 'config'
import formSupportSelectors from 'coreModules/formSupport/globalSelectors'
import { emToPixels } from 'coreModules/layout/utilities'
import { ModuleTranslate } from 'coreModules/i18n/components'

const mapStateToProps = (
  state,
  { activeFormSectionIndex, formName, index, sectionName }
) => {
  if (config.isTest) {
    return {
      sectionIsInvalid: false,
    }
  }

  const isActive = index === activeFormSectionIndex

  return {
    sectionIsInvalid: isActive
      ? formSupportSelectors.computeSectionIsInvalid(state, {
          formName,
          sectionName,
        })
      : formSupportSelectors.getSectionIsInvalid(state, {
          formName,
          sectionName,
        }),
  }
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  index: PropTypes.number.isRequired,
  module: PropTypes.string.isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  sectionIsInvalid: PropTypes.bool.isRequired,
  sectionName: PropTypes.string.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
}

class FormSectionNavigationItem extends Component {
  render() {
    const {
      activeFormSectionIndex,
      index,
      module,
      onSetActiveFormSection: handleSetActiveFormSection,
      sectionName,
      sectionIsInvalid,
    } = this.props

    return (
      <Step
        active={index === activeFormSectionIndex}
        className={sectionIsInvalid ? 'error' : undefined}
        key={index}
        onClick={event => handleSetActiveFormSection(event, index)}
        style={{
          width: emToPixels(21.875),
        }}
      >
        <Step.Content>
          <Step.Title>
            <ModuleTranslate
              capitalize
              module={module}
              textKey={`formSectionTitles.${sectionName}`}
            />
          </Step.Title>
          <Step.Description>
            <ModuleTranslate
              capitalize
              module={module}
              textKey={`formSectionDescriptions.${sectionName}`}
            />
          </Step.Description>
        </Step.Content>
      </Step>
    )
  }
}

FormSectionNavigationItem.propTypes = propTypes
FormSectionNavigationItem.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(FormSectionNavigationItem)
