import React, { Component } from 'react'
import { createInjectSearch } from 'coreModules/search/higherOrderComponents'
import InfiniteTable from './InfiniteTable'

class ResultTableView extends Component {
  render() {
    return <InfiniteTable />
  }
}

export default createInjectSearch({})(ResultTableView)
