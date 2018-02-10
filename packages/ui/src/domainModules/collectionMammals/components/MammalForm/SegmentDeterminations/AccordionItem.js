import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Accordion, Button, Grid, Icon, Popup } from 'semantic-ui-react'

import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ButtonCopyPasteField,
  Checkbox,
  Field,
  Input,
} from 'coreModules/form/components'
import { TaxonNameSearchInputWithResults } from 'domainModules/taxonomy/components'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const propTypes = {
  active: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  identification: PropTypes.shape({
    identificationRemarks: PropTypes.string,
    identifiedByAgentText: PropTypes.string,
    identifiedDateText: PropTypes.string,
    identifiedTaxonNameStandardized: PropTypes.string,
    isCurrentIdentification: PropTypes.bool,
  }),
  index: PropTypes.number.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  requireRemoveDeterminationConfirmation: PropTypes.bool.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  identification: {},
}

class AccordionItem extends Component {
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
      active,
      changeFieldValue,
      formValueSelector,
      getPath,
      i18n: { moduleTranslate },
      identification,
      index,
      isSmallScreen,
      removeArrayFieldByIndex,
      requireRemoveDeterminationConfirmation,
      setAccordionActiveIndex,
    } = this.props

    const {
      identificationRemarks,
      identifiedByAgentText,
      identifiedDateText,
      identifiedTaxonNameStandardized,
      isCurrentIdentification,
    } =
      identification || {}

    const headline = [
      identifiedTaxonNameStandardized,
      identifiedByAgentText,
      identifiedDateText,
      identificationRemarks,
      isCurrentIdentification &&
        moduleTranslate({ textKey: 'isCurrent' }).toLowerCase(),
    ]
      .filter(str => !!str)
      .join(', ')

    const taxonNameFieldKey = getPath('identifiedTaxonNameStandardized')

    return [
      <Accordion.Title
        active={active}
        index={index}
        key={`${index}.1`}
        onClick={event => {
          event.preventDefault()
          setAccordionActiveIndex({
            accordion: 'determinations',
            activeIndex: active ? -1 : index,
          })
        }}
      >
        <Icon name="dropdown" />
        {!active && headline}
      </Accordion.Title>,
      <Accordion.Content active={active} key={`${index}.2`}>
        <Grid textAlign="left" verticalAlign="top">
          <Grid.Row>
            <Grid.Column computer={2} mobile={8} tablet={2}>
              <Field
                autoComplete="off"
                component={Checkbox}
                label={moduleTranslate({ textKey: 'isCurrent' })}
                module="collectionMammals"
                name={getPath('isCurrentIdentification')}
                type="checkbox"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={6} mobile={16} tablet={5}>
              <Field
                autoComplete="off"
                component={TaxonNameSearchInputWithResults}
                label={moduleTranslate({ textKey: 'taxonName' })}
                module="collectionMammals"
                name={taxonNameFieldKey}
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={2} mobile={8} tablet={3}>
              <ButtonCopyPasteField
                arrowIcon={`${isSmallScreen ? 'down' : 'right'} arrow`}
                changeFieldValue={changeFieldValue}
                copyField={taxonNameFieldKey}
                fluid={!isSmallScreen}
                formValueSelector={formValueSelector}
                label={moduleTranslate({ textKey: 'copyToVerbatim' })}
                pasteField={getPath('identifiedAsVerbatim')}
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                label={moduleTranslate({ textKey: 'verbatimTaxonName' })}
                module="collectionMammals"
                name={getPath('identifiedAsVerbatim')}
                type="text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'determinedBy' })}
              module="collectionMammals"
              name={getPath('identifiedByAgentText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={3} mobile={8} tablet={3}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'date' })}
              module="collectionMammals"
              name={getPath('identifiedDateText')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'remarks' })}
              module="collectionMammals"
              name={getPath('identificationRemarks')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column mobile={16}>
            {requireRemoveDeterminationConfirmation ? (
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
                    {moduleTranslate({ textKey: 'remove' })}
                  </Button>
                }
              >
                <Popup.Header>
                  {moduleTranslate({ textKey: 'removeThisDetermination' })}
                </Popup.Header>
                <Popup.Content>
                  <Button
                    onClick={event => {
                      event.preventDefault()
                      this.handleCloseRemovePopup()
                      removeArrayFieldByIndex('identifications', index)
                    }}
                  >
                    {moduleTranslate({ textKey: 'remove' })}
                  </Button>
                  <Button
                    basic
                    onClick={event => {
                      event.preventDefault()
                      this.handleCloseRemovePopup()
                    }}
                  >
                    {moduleTranslate({ textKey: 'cancel' })}
                  </Button>
                </Popup.Content>
              </Popup>
            ) : (
              <Button
                onClick={event => {
                  event.preventDefault()
                  removeArrayFieldByIndex('identifications', index)
                }}
              >
                {moduleTranslate({ textKey: 'remove' })}
              </Button>
            )}
          </Grid.Column>
        </Grid>
      </Accordion.Content>,
    ]
  }
}

AccordionItem.propTypes = propTypes
AccordionItem.defaultProps = defaultProps

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'determination',
  }),
  pathBuilder({
    name: 'identifications',
  })
)(AccordionItem)
