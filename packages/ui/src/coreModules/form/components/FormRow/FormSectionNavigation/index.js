import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Step, Loader } from 'semantic-ui-react'

import { emToPixels } from 'coreModules/layout/utilities'
import { ModuleTranslate } from 'coreModules/i18n/components'

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
  header: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  module: PropTypes.string.isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  onShowAllFormSections: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
  showSectionsInNavigation: PropTypes.bool,
  subHeader: PropTypes.node,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  showSectionsInNavigation: false,
  subHeader: undefined,
}

export class FormSectionNavigation extends PureComponent {
  renderSection(index, name) {
    const {
      activeFormSectionIndex,
      module,
      onSetActiveFormSection: handleSetActiveFormSection,
    } = this.props

    return (
      <Step
        active={index === activeFormSectionIndex}
        key={index}
        onClick={event => handleSetActiveFormSection(event, index)}
        style={{ width: emToPixels(21.875) }}
      >
        <Step.Content>
          <Step.Title>
            <ModuleTranslate
              capitalize
              module={module}
              textKey={`formSectionTitles.${name}`}
            />
          </Step.Title>
          <Step.Description>
            <ModuleTranslate
              capitalize
              module={module}
              textKey={`formSectionDescriptions.${name}`}
            />
          </Step.Description>
        </Step.Content>
      </Step>
    )
  }

  render() {
    const {
      availableHeight: height,
      header,
      subHeader,
      loading,
      onShowAllFormSections: handleShowAllFormSections,
      sectionSpecs,
      showAllFormSections,
      showSectionsInNavigation,
    } = this.props

    return (
      <Grid padded style={{ height, overflow: 'auto' }}>
        <Grid.Column>
          <Header
            as="h1"
            block
            style={{
              background: 'none',
              borderColor: '#fff',
            }}
          >
            {loading && <Loader active inline size="tiny" />}
            {!loading && header}
            {!loading && subHeader}
          </Header>

          {showSectionsInNavigation && (
            <Step.Group size="small" style={{ marginTop: '-10px' }} vertical>
              {sectionSpecs.map(({ name }, index) => {
                return this.renderSection(index, name)
              })}
            </Step.Group>
          )}

          {showSectionsInNavigation &&
            handleShowAllFormSections && (
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
