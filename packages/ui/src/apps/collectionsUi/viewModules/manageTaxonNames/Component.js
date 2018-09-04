import React, { Component } from 'react'

import { TaxonNameManager } from 'domainModules/taxon/components'

const propTypes = {}

class ManageTaxonNames extends Component {
  render() {
    return <TaxonNameManager {...this.props} treeEnabled={false} />
  }
}

ManageTaxonNames.propTypes = propTypes

export default ManageTaxonNames
