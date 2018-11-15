import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, Step, Loader } from 'semantic-ui-react'

import FormSectionNavigationItem from './Item'

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

export const propTypes = {
  activeFormSectionIndex: PropTypes.number,
  availableHeight: PropTypes.number.isRequired,
  formName: PropTypes.string.isRequired,
  header: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  module: PropTypes.string.isRequired,
  onSetActiveFormSection: PropTypes.func.isRequired,
  onShowAllFormSections: PropTypes.func.isRequired,
  sectionSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  showAllFormSections: PropTypes.bool,
  showSectionsInNavigation: PropTypes.bool,
  subHeader: PropTypes.node,
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  loading: false,
  showAllFormSections: false,
  showSectionsInNavigation: false,
  subHeader: undefined,
}

export class FormSectionNavigation extends PureComponent {
  render() {
    const {
      activeFormSectionIndex,
      availableHeight: height,
      formName,
      header,
      loading,
      module,
      onSetActiveFormSection,
      onShowAllFormSections: handleShowAllFormSections,
      sectionSpecs,
      showAllFormSections,
      showSectionsInNavigation,
      subHeader,
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
            {!loading &&
              subHeader && (
                <Header.Subheader size="large">
                  <em>{subHeader}</em>
                </Header.Subheader>
              )}
          </Header>

          {showSectionsInNavigation && (
            <Step.Group size="small" style={{ marginTop: '-10px' }} vertical>
              {sectionSpecs.map(({ name }, index) => {
                return (
                  <FormSectionNavigationItem
                    activeFormSectionIndex={activeFormSectionIndex}
                    formName={formName}
                    index={index}
                    key={name}
                    module={module}
                    onSetActiveFormSection={onSetActiveFormSection}
                    sectionName={name}
                  />
                )
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
