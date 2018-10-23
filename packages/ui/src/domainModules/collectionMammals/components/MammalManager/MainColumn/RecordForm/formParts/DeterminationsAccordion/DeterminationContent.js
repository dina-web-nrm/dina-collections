import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Grid, Popup } from 'semantic-ui-react'

import createLog from 'utilities/log'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { Field, Input, Remarks, SingleDate } from 'coreModules/form/components'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { TogglableAgentDropdownPickerSearch } from 'domainModules/agent/components'

const log = createLog(
  'modules:collectionMammals:MammalManager/MainColumn/RecordForm/FormRow/formParts/DeterminationsAccordion/DeterminationContent'
)

const propTypes = {
  getPath: PropTypes.func.isRequired,
  getTranslationPath: PropTypes.func.isRequired,
  handleSetInactive: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
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
      getPath,
      getTranslationPath,
      handleSetInactive,
      i18n: { moduleTranslate },
      index,
      removeArrayFieldByIndex,
      skipRemoveDeterminationConfirmation,
    } = this.props

    log.render()
    return (
      <Grid textAlign="left" verticalAlign="bottom">
        <Grid.Row className="relaxed">
          <Grid.Column width={8}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="collectionMammals"
              name={getPath('taxonNameV')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              module="collectionMammals"
              name={getPath('taxonNameI')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Field
              autoComplete="off"
              component={Input}
              fluid
              model="determinations"
              module="collectionMammals"
              name={getPath('determinedByAgent.textV')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column width={9}>
            <Field
              autoComplete="off"
              buttonTextKey="other.addAgent"
              component={TogglableAgentDropdownPickerSearch}
              displayEmptyStateLabel={false}
              displayResultLabel={false}
              module="collectionMammals"
              name={getPath('determinedByAgent')}
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={SingleDate}
              module="collectionMammals"
              name={getPath('date')}
              parameterKey="determinations.date"
            />
          </Grid.Column>
          <Grid.Column width={16}>
            <Field
              autoComplete="off"
              component={Remarks}
              emptyStateTextKey="remarks.emptyState.determination"
              model="determination"
              module="collectionMammals"
              name={getPath('remarks')}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={16}>
            {skipRemoveDeterminationConfirmation && (
              <Button
                basic
                onClick={event => {
                  event.preventDefault()
                  handleSetInactive(index)
                  removeArrayFieldByIndex(getTranslationPath(), index)
                }}
                type="button"
              >
                {moduleTranslate({ capitalize: true, textKey: 'other.remove' })}
              </Button>
            )}
            {!skipRemoveDeterminationConfirmation && (
              <Popup
                hideOnScroll
                on="click"
                onClose={this.handleCloseRemovePopup}
                onOpen={this.handleOpenRemovePopup}
                open={this.state.isOpen}
                position="top right"
                trigger={
                  <Button
                    basic
                    onClick={event => {
                      event.preventDefault()
                    }}
                    type="button"
                  >
                    {moduleTranslate({
                      capitalize: true,
                      textKey: 'other.remove',
                    })}
                  </Button>
                }
              >
                <Popup.Header>
                  {moduleTranslate({
                    capitalize: true,
                    textKey: 'other.removeThisDetermination',
                  })}
                </Popup.Header>
                <Popup.Content>
                  <Button
                    onClick={event => {
                      event.preventDefault()
                      this.handleCloseRemovePopup()
                      handleSetInactive(index)
                      removeArrayFieldByIndex(getTranslationPath(), index)
                    }}
                  >
                    {moduleTranslate({
                      capitalize: true,
                      textKey: 'other.remove',
                    })}
                  </Button>
                  <Button
                    basic
                    onClick={event => {
                      event.preventDefault()
                      this.handleCloseRemovePopup()
                    }}
                  >
                    {moduleTranslate({
                      capitalize: true,
                      textKey: 'other.cancel',
                    })}
                  </Button>
                </Popup.Content>
              </Popup>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

DeterminationContent.propTypes = propTypes

export default compose(
  withI18n({ module: 'collectionMammals' }),
  pathBuilder()
)(DeterminationContent)
