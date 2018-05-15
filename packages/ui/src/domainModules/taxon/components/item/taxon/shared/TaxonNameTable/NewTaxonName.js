import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewTaxonNameRow from './NewTaxonNameRow'

const propTypes = {
  onInteraction: PropTypes.func.isRequired,
}
export class NewTaxonName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTaxonNameId: '',
    }
    this.handleSetNewTaxonNameId = this.handleSetNewTaxonNameId.bind(this)
    this.handleInteraction = this.handleInteraction.bind(this)
  }

  handleInteraction(type, args) {
    this.handleSetNewTaxonNameId('')
    this.props.onInteraction(type, args)
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
        onInteraction={this.handleInteraction}
        onSetNewTaxonNameId={this.handleSetNewTaxonNameId}
      />
    )
  }
}

NewTaxonName.propTypes = propTypes
export default NewTaxonName
