import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Button, Header, List, Modal } from 'semantic-ui-react'

import config from 'config'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { FormModal } from 'coreModules/form/components'
import CuratorialAssessmentItem from './CuratorialAssessmentItem'
import CreateCuratorialAssessment from './CuratorialAssessmentForm/Create'
import FieldsForTest from './CuratorialAssessmentForm/Test'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  curatorialAssessments: PropTypes.arrayOf(PropTypes.object),
  getPath: PropTypes.func.isRequired,
  removeArrayFieldByIndex: PropTypes.func.isRequired,
}
const defaultProps = {
  curatorialAssessments: [],
}

class CuratorialAssessmentsList extends Component {
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
      changeFieldValue,
      curatorialAssessments,
      getPath,
      removeArrayFieldByIndex,
    } = this.props
    const { open } = this.state

    return (
      <React.Fragment>
        <Header size="small">
          <ModuleTranslate textKey="headers.curatorialAssessments" />
        </Header>
        {curatorialAssessments.length > 0 && (
          <List divided>
            {[...curatorialAssessments]
              .map((item, index) => {
                return (
                  <CuratorialAssessmentItem
                    changeFieldValue={changeFieldValue}
                    index={index} // needed for pathBuilder
                    key={index} // eslint-disable-line react/no-array-index-key
                    removeArrayFieldByIndex={removeArrayFieldByIndex}
                    {...item}
                  />
                )
              })
              .reverse() // to show latest first
            }
          </List>
        )}
        <FormModal
          open={open}
          size="small"
          trigger={
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            !open && (
              <Button
                onClick={event => {
                  event.preventDefault()
                  this.handleOpen()
                }}
              >
                <ModuleTranslate textKey="other.newAssessment" />
              </Button>
            )
            /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          }
        >
          <Modal.Header>
            <ModuleTranslate textKey="other.newCuratorialAssessment" />
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <CreateCuratorialAssessment
                changeFieldValue={changeFieldValue}
                fieldName={`${getPath()}.${curatorialAssessments.length}`}
                onClose={this.handleClose}
              />
            </Modal.Description>
          </Modal.Content>
        </FormModal>
        {config.isTest && <FieldsForTest getPath={getPath} />}
      </React.Fragment>
    )
  }
}

CuratorialAssessmentsList.propTypes = propTypes
CuratorialAssessmentsList.defaultProps = defaultProps

export default compose(
  pathBuilder({
    name: 'curatorialAssessments',
  })
)(CuratorialAssessmentsList)
