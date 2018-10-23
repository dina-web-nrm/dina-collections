import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Header, Icon, Popup, Table } from 'semantic-ui-react'
import { createGetItemById } from 'coreModules/crud/higherOrderComponents'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import {
  ACCEPTED,
  DISCONNECT_TAXON_NAME,
  SET_TAXON_NAME_AS_ACCEPTED,
  SYNONYM,
} from '../../constants'

const propTypes = {
  item: PropTypes.object,
  itemId: PropTypes.string.isRequired,
  nameType: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  stateIndex: PropTypes.number,
}
const defaultProps = {
  item: undefined,
  stateIndex: undefined,
}

class TaxonNameRow extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { popupOpen: false }
  }

  render() {
    const { popupOpen } = this.state
    const { item, itemId, nameType, onInteraction, stateIndex } = this.props

    const { attributes: { name, rank, rubinNumber } = {} } = item || {}

    return (
      <Table.Row positive={nameType === ACCEPTED || undefined}>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{rank}</Table.Cell>
        <Table.Cell>{rubinNumber}</Table.Cell>
        <Table.Cell>{nameType}</Table.Cell>
        <Table.Cell>
          <Popup
            content={
              <React.Fragment>
                <Header>Choose an action</Header>
                {nameType === SYNONYM && (
                  <React.Fragment>
                    <a // eslint-disable-line
                      onClick={event => {
                        event.preventDefault()
                        onInteraction(SET_TAXON_NAME_AS_ACCEPTED, {
                          itemId,
                          nameType,
                          stateIndex,
                        })
                        this.setState({ popupOpen: false })
                      }}
                    >
                      Set as accepted
                    </a>
                    <br />
                  </React.Fragment>
                )}
                <Link
                  to={`/app/taxonNames?filterColumn=&itemId=${
                    itemId
                  }&mainColumn=edit`}
                >
                  Edit scientific name
                </Link>
                {nameType === SYNONYM && (
                  <React.Fragment>
                    <br />
                    <a // eslint-disable-line
                      onClick={event => {
                        event.preventDefault()
                        onInteraction(DISCONNECT_TAXON_NAME, {
                          itemId,
                          nameType,
                          stateIndex,
                        })
                        this.setState({ popupOpen: false })
                      }}
                    >
                      Remove from this taxon
                    </a>
                  </React.Fragment>
                )}
              </React.Fragment>
            }
            open={popupOpen}
            position="bottom right"
            trigger={
              <Icon
                name="ellipsis vertical"
                onClick={() => this.setState({ popupOpen: !popupOpen })}
                size="large"
                style={{ cursor: 'pointer' }}
              />
            }
          />
        </Table.Cell>
      </Table.Row>
    )
  }
}

TaxonNameRow.propTypes = propTypes
TaxonNameRow.defaultProps = defaultProps

export default compose(
  createGetItemById({
    refresh: false,
    resource: 'taxonName',
  })
)(TaxonNameRow)
