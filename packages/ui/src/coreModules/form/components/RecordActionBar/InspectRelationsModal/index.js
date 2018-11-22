import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { Button, Grid, Header, List, Modal } from 'semantic-ui-react'

import { ModuleTranslate } from 'coreModules/i18n/components'
import ListItem from './ListItem'

const propTypes = {
  recordHeader: PropTypes.string.isRequired,
  relations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ),
}
const defaultProps = {
  relations: [],
}

class InspectRelationsModal extends PureComponent {
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
    const { recordHeader, relations } = this.props
    const { open } = this.state

    const relatedResourcesByType = relations.reduce((types, relation) => {
      const { type } = relation

      return {
        ...types,
        [type]: types[type] ? types[type].concat([relation]) : [relation],
      }
    }, {})

    const sortedResourceTypes = Object.keys(relatedResourcesByType).sort()

    return (
      <React.Fragment>
        <Prompt
          message={() => {
            // first block transition then close
            setTimeout(this.handleClose)
            return false
          }}
          when={open}
        />
        <Modal
          onClose={this.handleClose}
          open={open}
          size="small"
          trigger={
            /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            !open && <a onClick={this.handleOpen}>inspect relations here</a>
            /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
          }
        >
          <Modal.Header>{`Relations for: ${recordHeader}`}</Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row className="relaxed" columns={1}>
                {sortedResourceTypes.map(resource => {
                  return (
                    <React.Fragment>
                      <Grid.Column>
                        <Header>
                          <ModuleTranslate
                            capitalize
                            module="form"
                            textKey={`resource.${resource}`}
                          />
                        </Header>
                      </Grid.Column>
                      <Grid.Column>
                        <List divided selection verticalAlign="middle">
                          {relatedResourcesByType[resource].map(
                            ({ id, type }) => {
                              return <ListItem id={id} resource={type} />
                            }
                          )}
                        </List>
                      </Grid.Column>
                    </React.Fragment>
                  )
                })}
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions style={{ textAlign: 'left' }}>
            <Button onClick={this.handleClose} primary>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

InspectRelationsModal.propTypes = propTypes
InspectRelationsModal.defaultProps = defaultProps

export default InspectRelationsModal
