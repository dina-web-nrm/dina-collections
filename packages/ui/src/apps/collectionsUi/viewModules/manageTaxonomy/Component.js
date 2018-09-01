import React, { Component } from 'react'

import { TaxonManager } from 'domainModules/taxon/components'

const propTypes = {}

class ManageTaxons extends Component {
  render() {
    return <TaxonManager {...this.props} />
  }
}

ManageTaxons.propTypes = propTypes

export default ManageTaxons
