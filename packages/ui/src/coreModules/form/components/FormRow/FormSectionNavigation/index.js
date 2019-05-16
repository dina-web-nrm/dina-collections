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
  itemHeader: PropTypes.node.isRequired,
  itemSubHeader: PropTypes.node,
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
}
const defaultProps = {
  activeFormSectionIndex: undefined,
  itemSubHeader: undefined,
  loading: false,
  showAllFormSections: false,
  showSectionsInNavigation: false,
}

export class FormSectionNavigation extends PureComponent {
  render() {
    const {
      activeFormSectionIndex,
      availableHeight: height,
      formName,
      itemHeader,
      itemSubHeader,
      loading,
      module,
      onSetActiveFormSection,
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
            data-testid="formSectionNavigationHeader"
            style={{
              background: 'none',
              borderColor: '#fff',
            }}
          >
            {loading && <Loader active inline size="tiny" />}
            {!loading && itemHeader}
            {!loading && itemSubHeader && (
              <Header.Subheader
                data-testid="formSectionNavigationSubheader"
                size="large"
              >
                <em>{itemSubHeader}</em>
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

          {showSectionsInNavigation && handleShowAllFormSections && (
            <Header
              block
              data-testid="formSectionNavigationItem-expandAllSections"
              onClick={handleShowAllFormSections}
              size="small"
              style={showAllFormSections ? activeStyle : inactiveStyle}
              sub
            >
              Expand all sections
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
