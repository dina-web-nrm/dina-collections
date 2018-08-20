import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Grid, Popup } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ButtonCopyPasteField,
  Field,
  Input,
  SingleDate,
} from 'coreModules/form/components'

import { TaxonNameSearchInputWithResults } from 'domainModules/taxon/components'
import crudSelectors from 'coreModules/crud/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { AdvancedAgentDropdownSearch } from 'domainModules/agent/components'
import { ALL } from 'domainModules/agent/constants'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations:DeterminationContent'
)

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  skipRemoveDeterminationConfirmation: PropTypes.bool.isRequired,
}

class DeterminationContent extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  handleOpenRemovePopup = () => {
    this.setState({ isOpen: true })
  }

  handleCloseRemovePopup = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const {
      changeFieldValue,
      formValueSelector,
      getPath,
      handleSetInactive,
      i18n: { moduleTranslate },
      index,
      isSmallScreen,
      removeArrayFieldByIndex,
      skipRemoveDeterminationConfirmation,
    } = this.props

    const taxonIdFieldKey = getPath('taxonName.id')

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={TaxonNameSearchInputWithResults}
              module="collectionMammals"
              name={taxonIdFieldKey}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={2} mobile={8} tablet={3}>
            <ButtonCopyPasteField
              arrowIcon={`${isSmallScreen ? 'down' : 'right'} arrow`}
              changeFieldValue={changeFieldValue}
              copyField={taxonIdFieldKey}
              fluid={!isSmallScreen}
              label={moduleTranslate({ textKey: 'other.copyToVerbatim' })}
              newValueSelector={state => {
                const taxonName = crudSelectors.taxonName.getOne(
                  state,
                  formValueSelector(state, taxonIdFieldKey)
                )
                return (
                  taxonName && taxonName.attributes && taxonName.attributes.name
                )
              }}
              pasteField={getPath('determinationVerbatim')}
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              module="collectionMammals"
              name={getPath('determinationVerbatim')}
              type="input-text"
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Column computer={6} mobile={16} tablet={8}>
          <SingleDate
            autoComplete="off"
            displayExact={false}
            displayFlexible
            displaySubLabels={false}
            displayText={false}
            displayTodayButton
            module="collectionMammals"
            name={getPath('date')}
            parameterKey="determinations.date"
            past
            stack={false}
          />
        </Grid.Column>

        <Grid.Column computer={5} mobile={16} tablet={7}>
          <Field
            autoComplete="off"
            component={AdvancedAgentDropdownSearch}
            group={ALL}
            initialText="Choose"
            module="collectionMammals"
            name={getPath('determinedByAgent.id')}
          />
        </Grid.Column>
        <Grid.Column computer={5} mobile={16} tablet={5}>
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('determinedByAgentText')}
            type="input-text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={getPath('remarks')}
            type="input-text"
          />
        </Grid.Column>
        <Grid.Column mobile={16}>
          <Button
            onClick={event => {
              event.preventDefault()
              handleSetInactive(index)
            }}
          >
            Save
          </Button>
          {skipRemoveDeterminationConfirmation && (
            <Button
              onClick={event => {
                event.preventDefault()
                handleSetInactive(index)
                removeArrayFieldByIndex('determinations', index)
              }}
            >
              {moduleTranslate({ textKey: 'other.remove' })}
            </Button>
          )}
          {!skipRemoveDeterminationConfirmation && (
            <Popup
              hideOnScroll
              on="click"
              onClose={this.handleCloseRemovePopup}
              onOpen={this.handleOpenRemovePopup}
              open={this.state.isOpen}
              trigger={
                <Button
                  onClick={event => {
                    event.preventDefault()
                  }}
                >
                  {moduleTranslate({ textKey: 'other.remove' })}
                </Button>
              }
            >
              <Popup.Header>
                {moduleTranslate({ textKey: 'other.removeThisDetermination' })}
              </Popup.Header>
              <Popup.Content>
                <Button
                  onClick={event => {
                    event.preventDefault()
                    this.handleCloseRemovePopup()
                    handleSetInactive(index)
                    removeArrayFieldByIndex('determinations', index)
                  }}
                >
                  {moduleTranslate({ textKey: 'other.remove' })}
                </Button>
                <Button
                  basic
                  onClick={event => {
                    event.preventDefault()
                    this.handleCloseRemovePopup()
                  }}
                >
                  {moduleTranslate({ textKey: 'other.cancel' })}
                </Button>
              </Popup.Content>
            </Popup>
          )}
        </Grid.Column>
      </Grid>
    )
  }
}

DeterminationContent.propTypes = propTypes

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'determination',
  }),
  pathBuilder({
    name: 'individual.determinations',
  })
)(DeterminationContent)
