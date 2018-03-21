import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Accordion, Button, Grid, Icon, Popup } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import {
  ButtonCopyPasteField,
  Checkbox,
  Field,
  Input,
} from 'coreModules/form/components'

import { TaxonNameSearchInputWithResults } from 'domainModules/taxonService/components'
import taxonSelectors from 'domainModules/taxonService/globalSelectors'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

const log = createLog(
  'modules:collectionMammals:MammalForm:SegmentDeterminations:AccordionItem'
)

const propTypes = {
  active: PropTypes.bool.isRequired,
  changeFieldValue: PropTypes.func.isRequired,
  determination: PropTypes.shape({
    date: PropTypes.string,
    determinedByAgentText: PropTypes.string,
    isCurrentDetermination: PropTypes.bool,
    remarks: PropTypes.string,
    taxonNameStandardized: PropTypes.string,
  }),
  formValueSelector: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
  requireRemoveDeterminationConfirmation: PropTypes.bool.isRequired,
  setAccordionActiveIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  determination: {},
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
      determination,
      formValueSelector,
      getPath,
      i18n: { moduleTranslate },
      index,
      isSmallScreen,
      removeArrayFieldByIndex,
      requireRemoveDeterminationConfirmation,
      setAccordionActiveIndex,
    } = this.props

    const {
      date,
      determinedByAgentText,
      isCurrentDetermination,
      remarks,
      taxonNameStandardized,
    } =
      determination || {}

    const headline = [
      taxonNameStandardized,
      determinedByAgentText,
      date,
      remarks,
      isCurrentDetermination &&
        moduleTranslate({ textKey: 'isCurrent' }).toLowerCase(),
    ]
      .filter(str => !!str)
      .join(', ')

    const taxonIdFieldKey = getPath('taxon.id')

    log.render()
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
                name={getPath('isCurrentDetermination')}
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
                label={moduleTranslate({ textKey: 'copyToVerbatim' })}
                newValueSelector={state => {
                  const taxon = taxonSelectors.getTaxon(
                    state,
                    formValueSelector(state, taxonIdFieldKey)
                  )
                  return taxon && taxon.scientificName
                }}
                pasteField={getPath('determinationVerbatim')}
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <Field
                autoComplete="off"
                component={Input}
                label={moduleTranslate({ textKey: 'verbatimTaxonName' })}
                module="collectionMammals"
                name={getPath('determinationVerbatim')}
                type="input-text"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Column computer={5} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'determinedBy' })}
              module="collectionMammals"
              name={getPath('determinedByAgentText')}
              type="input-text"
            />
          </Grid.Column>
          <Grid.Column computer={3} mobile={8} tablet={3}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'date' })}
              module="collectionMammals"
              name={getPath('date')}
              type="input-text"
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label={moduleTranslate({ textKey: 'remarks' })}
              module="collectionMammals"
              name={getPath('remarks')}
              type="input-text"
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
                      removeArrayFieldByIndex(
                        'taxonInformation.determinations',
                        index
                      )
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
                  removeArrayFieldByIndex(
                    'taxonInformation.determinations',
                    index
                  )
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
    name: 'taxonInformation.determinations',
  })
)(AccordionItem)
