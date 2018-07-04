import React, { Component } from 'react'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import InfinityTable from './InfinityTable'
// import FlatListTable from './FlatListTable'

class ResultTableView extends Component {
  render() {
    const columnHeader = [
      'Catalog Number',
      'Curatorial Name',
      'Family',
      'Genus',
      'Species',
      'Start Date',
      'Locality',
      'Death',
      'Sex',
      'Age',
    ]
    return <InfinityTable columnHeader={columnHeader} />
  }
}

export default createInjectSearch({})(ResultTableView)
