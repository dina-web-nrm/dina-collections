import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, List, Modal } from 'semantic-ui-react'

import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createModuleTranslate } from 'coreModules/i18n/components'
import EditCuratorialAssessment from './CuratorialAssessmentForm/Edit'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'collectionItems',
})

const propTypes = {
  agent: PropTypes.shape({
    fullName: PropTypes.string,
  }),
  agentText: PropTypes.string,
  changeFieldValue: PropTypes.func.isRequired,
  condition: PropTypes.string,
  conditionRemarks: PropTypes.string,
  date: PropTypes.object,
  getPath: PropTypes.func.isRequired,
  inventoryStatusRemarks: PropTypes.string,
  isInStorage: PropTypes.bool,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  agent: undefined,
  agentText: undefined,
  condition: undefined,
  conditionRemarks: undefined,
  date: undefined,
  inventoryStatusRemarks: undefined,
  isInStorage: undefined,
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
      agentText,
      date,
      condition,
      conditionRemarks,
      changeFieldValue,
      getPath,
      inventoryStatusRemarks,
      isInStorage,
      removeArrayFieldByIndex,
    } = this.props

    const { open } = this.state
    return (
      <List.Item>
        <List.Content style={{ padding: '0.5em' }} verticalAlign="bottom">
          <Modal
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
                    <Grid.Column computer={2} mobile={4} tablet={4}>
                      {date && date.dateText}
                    </Grid.Column>
                    <Grid.Column computer={3} mobile={6} tablet={6}>
                      {agent && agent.fullName}
                    </Grid.Column>
                    <Grid.Column computer={3} mobile={6} tablet={6}>
                      {agentText}
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} tablet={8}>
                      {isInStorage !== undefined &&
                        (isInStorage ? 'In storage' : 'Not found')}
                      {inventoryStatusRemarks && (
                        <em>{`. ${inventoryStatusRemarks}`}</em>
                      )}
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={16} tablet={8}>
                      {condition}
                      {conditionRemarks && <em>{`. ${conditionRemarks}`}</em>}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )
              /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            }
          >
            <Modal.Header>
              <ModuleTranslate textKey="editCuratorialAssessment" />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <EditCuratorialAssessment
                  agent={agent}
                  changeFieldValue={changeFieldValue}
                  condition={condition}
                  conditionRemarks={conditionRemarks}
                  date={date}
                  fieldName={getPath()}
                  inventoryStatusRemarks={inventoryStatusRemarks}
                  isInStorage={isInStorage}
                  onClose={this.handleClose}
                  removeArrayFieldByIndex={removeArrayFieldByIndex}
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </List.Content>
      </List.Item>
    )
  }
}

CuratorialAssessmentItem.propTypes = propTypes
CuratorialAssessmentItem.defaultProps = defaultProps

export default pathBuilder()(CuratorialAssessmentItem)
