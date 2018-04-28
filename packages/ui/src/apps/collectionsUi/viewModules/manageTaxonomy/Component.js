import React, { Component } from 'react'

import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import { TaxonomyManager } from 'domainModules/taxon/components'

const propTypes = {}

class ManageTaxons extends Component {
  render() {
    return (
      <PageTemplate container={false}>
        <TaxonomyManager />
      </PageTemplate>
    )
  }
}

ManageTaxons.propTypes = propTypes

export default ManageTaxons
