import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { arrayPush, arrayUnshift, arrayRemove, change } from 'redux-form'

import createLog from 'utilities/log'
import AddButton from 'coreModules/form/components/parts/StaticContent/AddButton'
import {
  ACCEPTED,
  ADD_SYNONYM,
  DISCONNECT_TAXON_NAME,
  SET_TAXON_NAME_AS_ACCEPTED,
  SYNONYM,
} from '../../constants'
import { createSortedNameList } from '../../utilities'
import TaxonNameRow from './TaxonNameRow'
import NewTaxonNameRow from './NewTaxonNameRow'

const log = createLog('modules:taxon:taxon:ScientificNamesTable')

const mapStateToProps = (state, { formValueSelector }) => {
  const acceptedTaxonName = formValueSelector(state, 'acceptedTaxonName')
  const synonyms = formValueSelector(state, 'synonyms')
  const scientificNames = createSortedNameList({
    acceptedTaxonName,
    synonyms,
  })

  return {
    acceptedTaxonName,
    scientificNames,
  }
}

const mapDispatchToProps = {
  arrayPush,
  arrayRemove,
  arrayUnshift,
  change,
}

const propTypes = {
  acceptedTaxonName: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  arrayPush: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  arrayUnshift: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  scientificNames: PropTypes.array.isRequired,
}

export class ScientificNamesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connectingScientificName: props.scientificNames.length === 0,
    }

    this.handleInteraction = this.handleInteraction.bind(this)
    this.setTaxonNameAsAccepted = this.setTaxonNameAsAccepted.bind(this)
    this.disconnectTaxonName = this.disconnectTaxonName.bind(this)
    this.addSynonym = this.addSynonym.bind(this)
  }

  setTaxonNameAsAccepted({ itemId } = {}) {
    const currentAcceptedName = this.props.acceptedTaxonName

    this.disconnectTaxonName({
      itemId,
    })

    if (currentAcceptedName && currentAcceptedName.id) {
      this.setTaxonNameAsSynonym({
        itemId: currentAcceptedName.id,
        nameType: ACCEPTED,
      })
    }

    return this.props.change(this.props.formName, 'acceptedTaxonName', {
      id: itemId,
    })
  }

  setTaxonNameAsSynonym({ itemId, nameType } = {}) {
    this.addSynonym({
      itemId,
      unshift: nameType === ACCEPTED,
    })
    return null
  }

  addSynonym({ itemId, unshift = false } = {}) {
    this.disconnectTaxonName({
      itemId,
    })

    if (unshift) {
      return this.props.arrayUnshift(this.props.formName, 'synonyms', {
        id: itemId,
      })
    }

    return this.props.arrayPush(this.props.formName, 'synonyms', {
      id: itemId,
    })
  }

  disconnectTaxonName({ itemId } = {}) {
    const existingTaxonNameListItem = this.props.scientificNames.find(
      ({ id }) => {
        return id === itemId
      }
    )

    if (!existingTaxonNameListItem) {
      return null
    }

    const { nameType, stateIndex } = existingTaxonNameListItem

    if (nameType === SYNONYM) {
      this.props.arrayRemove(this.props.formName, 'synonyms', stateIndex)
    }
    if (nameType === ACCEPTED) {
      this.props.change(this.props.formName, 'acceptedTaxonName', null)
    }
    return null
  }

  handleInteraction(interactionType, { itemId, stateIndex } = {}) {
    switch (interactionType) {
      case ADD_SYNONYM: {
        this.setState({ connectingScientificName: false })

        if (!this.props.scientificNames.length) {
          this.setTaxonNameAsAccepted({ itemId })
          break
        }

        // do nothing if name has already been added to list
        if (this.props.scientificNames.find(({ id }) => itemId === id)) {
          break
        }

        this.addSynonym({
          itemId,
        })
        break
      }
      case DISCONNECT_TAXON_NAME: {
        this.disconnectTaxonName({
          itemId,
          stateIndex,
        })
        break
      }
      case SET_TAXON_NAME_AS_ACCEPTED: {
        this.setTaxonNameAsAccepted({
          itemId,
        })
        break
      }
      default: {
        break
      }
    }
  }

  render() {
    log.render()
    const { scientificNames } = this.props
    const { connectingScientificName } = this.state

    return (
      <React.Fragment>
        {(scientificNames.length > 0 || connectingScientificName) && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={6}>
                  <span className="required asterisk">Name</span>
                </Table.HeaderCell>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>RUBIN</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {scientificNames.map(taxonItem => {
                return (
                  <TaxonNameRow
                    itemId={taxonItem.id}
                    key={taxonItem.id}
                    nameType={taxonItem.nameType}
                    onInteraction={this.handleInteraction}
                    stateIndex={taxonItem.stateIndex}
                  />
                )
              })}
              {connectingScientificName && (
                <NewTaxonNameRow
                  isFirstName={scientificNames.length === 0}
                  onInteraction={this.handleInteraction}
                />
              )}
            </Table.Body>
          </Table>
        )}
        {!connectingScientificName && (
          <AddButton
            id="connect-scientific-name"
            module="taxon"
            onClick={event => {
              event.preventDefault()
              this.setState({ connectingScientificName: true })
            }}
            textKey="connectScientificName"
          />
        )}
      </React.Fragment>
    )
  }
}

ScientificNamesTable.propTypes = propTypes

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ScientificNamesTable
)
