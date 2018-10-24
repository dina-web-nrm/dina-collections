import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { arrayPush, arrayUnshift, arrayRemove, change } from 'redux-form'

import createLog from 'utilities/log'
import AddButton from 'coreModules/form/components/parts/StaticContent/AddButton'
import TaxonRow from './TaxonRow'
import NewTaxonRow from './NewTaxonRow'

const log = createLog('modules:storage:AcceptedTaxonNamesTable')

const mapStateToProps = (state, { formValueSelector }) => {
  const taxa = formValueSelector(state, 'taxa')

  return {
    taxa,
  }
}

const mapDispatchToProps = {
  arrayPush,
  arrayRemove,
  arrayUnshift,
  change,
}

const propTypes = {
  arrayPush: PropTypes.func.isRequired,
  arrayRemove: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  taxa: PropTypes.array,
}
const defaultProps = {
  taxa: [],
}

export class AcceptedTaxonNamesTable extends Component {
  constructor(props) {
    super(props)

    this.state = { connectingTaxon: false }

    this.disconnectName = this.disconnectName.bind(this)
    this.addName = this.addName.bind(this)
  }

  addName(itemId) {
    this.setState({ connectingTaxon: false })
    return this.props.arrayPush(this.props.formName, 'taxa', {
      id: itemId,
    })
  }

  disconnectName(index) {
    return this.props.arrayRemove(this.props.formName, 'taxa', index)
  }

  render() {
    log.render()
    const { taxa } = this.props
    const { connectingTaxon } = this.state

    return (
      <React.Fragment>
        {(taxa.length > 0 || connectingTaxon) && (
          <Table celled>
            <Table.Body>
              {taxa.map((taxon, index) => {
                return (
                  <TaxonRow
                    disconnectName={this.disconnectName}
                    index={index}
                    itemId={taxon.id}
                    key={taxon.id}
                  />
                )
              })}
              {connectingTaxon && <NewTaxonRow addName={this.addName} />}
            </Table.Body>
          </Table>
        )}
        {!connectingTaxon && (
          <AddButton
            id="connect-taxon"
            module="storage"
            onClick={event => {
              event.preventDefault()
              this.setState({ connectingTaxon: true })
            }}
            textKey="connectTaxon"
          />
        )}
      </React.Fragment>
    )
  }
}

AcceptedTaxonNamesTable.propTypes = propTypes
AcceptedTaxonNamesTable.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AcceptedTaxonNamesTable
)
