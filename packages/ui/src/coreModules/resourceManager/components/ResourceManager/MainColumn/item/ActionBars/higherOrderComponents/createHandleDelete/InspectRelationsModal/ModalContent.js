import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Header, List, Modal } from 'semantic-ui-react'
import objectPath from 'object-path'

import { ModuleTranslate } from 'coreModules/i18n/components'
import ListItem from './ListItem'

const propTypes = {
  relationships: PropTypes.objectOf(
    PropTypes.shape({
      customNumberOfItems: PropTypes.number,
      data: PropTypes.oneOfType([
        PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          })
        ),
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        }),
      ]),
    })
  ),
}
const defaultProps = {
  relationships: {},
}

class ModalContent extends PureComponent {
  render() {
    const { relationships } = this.props

    const sortedRelationships = Object.keys(relationships).sort()

    return (
      <Modal.Content>
        <Grid>
          <Grid.Row className="relaxed" columns={1}>
            {sortedRelationships.map(relationshipKey => {
              const data = objectPath.get(
                relationships,
                `${relationshipKey}.data`
              )

              const isArray = Array.isArray(data)

              if (!data || (isArray && !data.length)) {
                return null
              }

              const customNumberOfItems = objectPath.get(
                relationships,
                `${relationshipKey}.customNumberOfItems`
              )

              const numberOfItems = isArray
                ? customNumberOfItems || data.length
                : 1

              const { type: relationshipResource } = isArray ? data[0] : data

              return (
                <React.Fragment key={relationshipKey}>
                  <Grid.Column>
                    <Header>
                      <ModuleTranslate
                        capitalize
                        module="resourceManager"
                        textKey={`relationshipKey.${relationshipKey}`}
                      />{' '}
                      ({numberOfItems}{' '}
                      <ModuleTranslate
                        module="resourceManager"
                        textKey="relations"
                      />)
                      {numberOfItems > 30 && (
                        <Header.Subheader>
                          {`Below are 30 of the relations. To see all ${
                            numberOfItems
                          } relations, please use the search for `}
                          <ModuleTranslate
                            module="resourceManager"
                            textKey={`resourcePlural.${relationshipResource}`}
                          />.
                        </Header.Subheader>
                      )}
                    </Header>
                  </Grid.Column>
                  <Grid.Column>
                    <List divided selection verticalAlign="middle">
                      {(isArray ? data : [data])
                        .slice(0, 30)
                        .map(({ id, type }) => {
                          return <ListItem id={id} key={id} resource={type} />
                        })}
                    </List>
                  </Grid.Column>
                </React.Fragment>
              )
            })}
          </Grid.Row>
        </Grid>
      </Modal.Content>
    )
  }
}

ModalContent.propTypes = propTypes
ModalContent.defaultProps = defaultProps

export default ModalContent
