import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewTaxonNameRow from './NewTaxonNameRow'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
}
export class NewTaxonNameRowWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTaxonNameId: '',
    }
    this.handleSetNewTaxonNameId = this.handleSetNewTaxonNameId.bind(this)
    this.handleOnInteraction = this.handleOnInteraction.bind(this)
  }

  handleOnInteraction(interactionType, args) {
    this.handleSetNewTaxonNameId('')
    this.props.onInteraction(interactionType, args)
  }

  handleSetNewTaxonNameId(newTaxonNameId) {
    this.setState({
      newTaxonNameId,
    })
  }

  render() {
    const { newTaxonNameId: itemId } = this.state
    return (
      <NewTaxonNameRow
        itemId={itemId}
        onInteraction={this.handleOnInteraction}
        onSetNewTaxonNameId={this.handleSetNewTaxonNameId}
      />
    )
  }
}

NewTaxonNameRowWrapper.propTypes = propTypes
export default NewTaxonNameRowWrapper
