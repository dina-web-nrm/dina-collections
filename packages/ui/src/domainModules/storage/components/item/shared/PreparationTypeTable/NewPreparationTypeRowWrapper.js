import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewPreparationTypeRow from './NewPreparationTypeRow'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
}
export class NewPreparationTypeRowWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newPreparationTypeId: '',
    }
    this.handleSetNewPreparationTypeId = this.handleSetNewPreparationTypeId.bind(
      this
    )
    this.handleOnInteraction = this.handleOnInteraction.bind(this)
  }

  handleOnInteraction(interactionType, args) {
    this.handleSetNewPreparationTypeId('')
    this.props.onInteraction(interactionType, args)
  }

  handleSetNewPreparationTypeId(newPreparationTypeId) {
    this.setState({
      newPreparationTypeId,
    })
  }

  render() {
    const { newPreparationTypeId: itemId } = this.state
    return (
      <NewPreparationTypeRow
        itemId={itemId}
        onInteraction={this.handleOnInteraction}
        onSetNewPreparationTypeId={this.handleSetNewPreparationTypeId}
      />
    )
  }
}

NewPreparationTypeRowWrapper.propTypes = propTypes
export default NewPreparationTypeRowWrapper
