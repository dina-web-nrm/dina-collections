import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Grid, Modal, List } from 'semantic-ui-react'
import objectPath from 'object-path'

import { buildYYYYMMDD } from 'common/es5/date'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { FormModal } from 'coreModules/form/components'
import { createModuleTranslate } from 'coreModules/i18n/components'
import EditCuratorialAssessment from './CuratorialAssessmentForm/Edit'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  agent: PropTypes.shape({
    normalized: { id: PropTypes.string },
    textI: PropTypes.string,
  }),
  changeFieldValue: PropTypes.func.isRequired,
  condition: PropTypes.string,
  date: PropTypes.object,
  getPath: PropTypes.func.isRequired,
  isInStorage: PropTypes.bool,
  normalizedAgent: PropTypes.shape({
    attributes: PropTypes.shape({
      fullName: PropTypes.string,
    }),
    id: PropTypes.string.isRequired,
  }),
  remarks: PropTypes.string,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  agent: undefined,
  condition: undefined,
  date: undefined,
  isInStorage: undefined,
  normalizedAgent: undefined,
  remarks: undefined,
}

class CuratorialAssessmentItem extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)

    this.state = {
      open: false,
    }
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleOpen() {
    this.setState({ open: true })
  }

  render() {
    const {
      agent,
      changeFieldValue,
      condition,
      date,
      getPath,
      isInStorage,
      normalizedAgent,
      remarks,
      removeArrayFieldByIndex,
    } = this.props

    const { open } = this.state

    const fullName =
      objectPath.get(normalizedAgent, 'attributes.fullName') ||
      (agent && agent.textI)
    const disambiguatingDescription = objectPath.get(
      normalizedAgent,
      'attributes.disambiguatingDescription'
    )
    return (
      <List.Item>
        <List.Content style={{ padding: '0.5em' }} verticalAlign="bottom">
          <FormModal
            open={open}
            size="small"
            trigger={
              /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
              !open && (
                <Grid
                  onClick={this.handleOpen}
                  style={{ cursor: 'pointer' }}
                  textAlign="left"
                >
                  <Grid.Row>
                    <Grid.Column width={16}>
                      {[
                        date && date.startDate && buildYYYYMMDD(date.startDate),
                        disambiguatingDescription
                          ? `${fullName} (${disambiguatingDescription})`
                          : fullName,
                        isInStorage !== undefined &&
                          (isInStorage ? 'In storage' : 'Not in storage'),
                        condition,
                        remarks,
                      ]
                        .filter(Boolean)
                        .join('; ')}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
              /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            }
          >
            <Modal.Header>
              <ModuleTranslate textKey="headers.editCuratorialAssessment" />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <EditCuratorialAssessment
                  agent={agent}
                  changeFieldValue={changeFieldValue}
                  condition={condition}
                  date={date}
                  fieldName={getPath()}
                  isInStorage={isInStorage}
                  onClose={this.handleClose}
                  remarks={remarks}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                />
              </Modal.Description>
            </Modal.Content>
          </FormModal>
        </List.Content>
      </List.Item>
    )
  }
}

CuratorialAssessmentItem.propTypes = propTypes
CuratorialAssessmentItem.defaultProps = defaultProps

export default compose(
  createGetItemById({
    idPath: 'agent.normalized.id',
    itemKey: 'normalizedAgent',
    resource: 'normalizedAgent',
  }),
  pathBuilder()
)(CuratorialAssessmentItem)
