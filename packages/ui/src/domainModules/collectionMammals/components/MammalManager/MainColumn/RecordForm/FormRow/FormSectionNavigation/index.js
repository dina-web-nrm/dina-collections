import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const activeStyle = {
  backgroundColor: 'rgb(245, 245, 244)',
  borderColor: '#1e8c45',
  cursor: 'pointer',
  margin: 0,
}
const inactiveStyle = {
  background: 'none',
  borderColor: '#fff',
  cursor: 'pointer',
  margin: 0,
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  formSections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  onShowAllFormSections: PropTypes.func.isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
}

class FormSectionNavigation extends PureComponent {
  render() {
    const {
      activeFormSectionIndex,
      availableHeight: height,
      formSections,
      onSetActiveFormSection: handleSetActiveFormSection,
      onShowAllFormSections: handleShowAllFormSections,
      showAllFormSections,
    } = this.props

    return (
      <Grid padded style={{ height, overflow: 'auto' }}>
        <Grid.Column>
          {formSections.map(({ name }, index) => {
            const isActive = index === activeFormSectionIndex

            return (
              <Header
                block
                key={name}
                onClick={event => handleSetActiveFormSection(event, index)}
                size="small"
                style={
                  isActive && !showAllFormSections ? activeStyle : inactiveStyle
                }
              >
                <ModuleTranslate
                  capitalize
                  textKey={`formSectionTitles.${name}`}
                />
              </Header>
            )
          })}
          {handleShowAllFormSections && (
            <Header
              block
              onClick={handleShowAllFormSections}
              size="small"
              style={showAllFormSections ? activeStyle : inactiveStyle}
              sub
            >
              Show all
            </Header>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

FormSectionNavigation.propTypes = propTypes
FormSectionNavigation.defaultProps = defaultProps

export default FormSectionNavigation
