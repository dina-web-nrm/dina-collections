import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Header, Loader } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import globalSelectors from 'domainModules/collectionMammals/globalSelectors'

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

const mapStateToProps = (state, { form }) => {
  return {
    catalogNumber: globalSelectors.createGetCatalogNumber(form)(state),
  }
}

const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  catalogNumber: PropTypes.string,
  formSections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  onShowAllFormSections: PropTypes.func.isRequired,
  showAllFormSections: PropTypes.bool.isRequired,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  catalogNumber: undefined,
}

class FormSectionNavigation extends PureComponent {
  render() {
    const {
      activeFormSectionIndex,
      availableHeight: height,
      catalogNumber,
      formSections,
      loading,
      onSetActiveFormSection: handleSetActiveFormSection,
      onShowAllFormSections: handleShowAllFormSections,
      showAllFormSections,
    } = this.props

    return (
      <Grid padded style={{ height, overflow: 'auto' }}>
        <Grid.Column>
          <Header block size="large" style={inactiveStyle}>
            {loading && <Loader active inline size="tiny" />}
            {!loading &&
              (catalogNumber || (
                <ModuleTranslate textKey="headers.newSpecimen" />
              ))}
          </Header>
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

export default connect(mapStateToProps)(FormSectionNavigation)
