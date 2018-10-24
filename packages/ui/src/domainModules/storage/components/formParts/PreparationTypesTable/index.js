import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { arrayPush, arrayUnshift, arrayRemove, change } from 'redux-form'

import createLog from 'utilities/log'
import AddButton from 'coreModules/form/components/parts/StaticContent/AddButton'
import PreparationTypeRow from './PreparationTypeRow'
import NewPreparationTypeRow from './NewPreparationTypeRow'

const log = createLog('modules:storage:PreparationTypesTable')

const mapStateToProps = (state, { formValueSelector }) => {
  const preparationTypes = formValueSelector(state, 'preparationTypes')

  return {
    preparationTypes,
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
  preparationTypes: PropTypes.array,
}
const defaultProps = {
  preparationTypes: [],
}

export class PreparationTypesTable extends Component {
  constructor(props) {
    super(props)

    this.state = { connectingPreparationType: false }

    this.disconnectPreparationType = this.disconnectPreparationType.bind(this)
    this.addPreparationType = this.addPreparationType.bind(this)
  }

  addPreparationType(itemId) {
    this.setState({ connectingPreparationType: false })
    return this.props.arrayPush(this.props.formName, 'preparationTypes', {
      id: itemId,
    })
  }

  disconnectPreparationType(index) {
    return this.props.arrayRemove(
      this.props.formName,
      'preparationTypes',
      index
    )
  }

  render() {
    log.render()
    const { preparationTypes } = this.props
    const { connectingPreparationType } = this.state

    return (
      <React.Fragment>
        {(preparationTypes.length > 0 || connectingPreparationType) && (
          <Table celled>
            <Table.Body>
              {preparationTypes.map((preparationType, index) => {
                return (
                  <PreparationTypeRow
                    disconnectPreparationType={this.disconnectPreparationType}
                    index={index}
                    itemId={preparationType.id}
                    key={preparationType.id}
                  />
                )
              })}
              {connectingPreparationType && (
                <NewPreparationTypeRow
                  addPreparationType={this.addPreparationType}
                />
              )}
            </Table.Body>
          </Table>
        )}
        {!connectingPreparationType && (
          <AddButton
            id="connect-preparation-type"
            module="storage"
            onClick={event => {
              event.preventDefault()
              this.setState({ connectingPreparationType: true })
            }}
            textKey="connectPreparationType"
          />
        )}
      </React.Fragment>
    )
  }
}

PreparationTypesTable.propTypes = propTypes
PreparationTypesTable.defaultProps = defaultProps

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  PreparationTypesTable
)
