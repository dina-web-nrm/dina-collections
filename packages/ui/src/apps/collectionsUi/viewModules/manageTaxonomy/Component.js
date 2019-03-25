import React, { Component } from 'react'

import { TaxonManager } from 'domainModules/taxon/components'

const propTypes = {}

class ManageTaxonomy extends Component {
  render() {
    return <TaxonManager {...this.props} />
  }
}

ManageTaxonomy.propTypes = propTypes

export default ManageTaxonomy
