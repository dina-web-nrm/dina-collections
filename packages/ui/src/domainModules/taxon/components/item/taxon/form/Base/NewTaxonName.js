import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewTaxonNameRow from './NewTaxonNameRow'

const propTypes = {
  onTaxonNameInteraction: PropTypes.func.isRequired,
}
export class NewTaxonName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTaxonNameId: '',
    }
    this.handleSetNewTaxonNameId = this.handleSetNewTaxonNameId.bind(this)
    this.handleTaxonNameInteraction = this.handleTaxonNameInteraction.bind(this)
  }

  handleTaxonNameInteraction(args) {
    this.handleSetNewTaxonNameId('')
    this.props.onTaxonNameInteraction(args)
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
        onSetNewTaxonNameId={this.handleSetNewTaxonNameId}
        onTaxonNameInteraction={this.handleTaxonNameInteraction}
      />
    )
  }
}

NewTaxonName.propTypes = propTypes
export default NewTaxonName
