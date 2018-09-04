import React, { Component } from 'react'

const initialState = {
  collectionColumn: undefined,
  itemColumn: undefined,
  itemId: undefined,
}

const createLocalState = () => ComposedComponent => {
  class LocalState extends Component {
    constructor(props) {
      super(props)
      this.replaceLocalState = this.replaceLocalState.bind(this)
      this.updateLocalState = this.updateLocalState.bind(this)
      this.clearLocalState = this.clearLocalState.bind(this)
      this.state = initialState
    }

    replaceLocalState(newState) {
      this.setState(newState)
    }

    updateLocalState(newPartialState = {}) {
      this.setState(prevState => {
        return {
          ...prevState,
          ...newPartialState,
        }
      })
    }

    clearLocalState(params) {
      if (params) {
        this.setState(prevState => {
          const updatedState = {
            ...prevState,
          }
          params.forEach(param => {
            updatedState[param] = initialState[param]
          })
          return updatedState
        })
      } else {
        this.setState(initialState)
      }
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          clearState={this.clearLocalState}
          replaceState={this.replaceLocalState}
          state={this.state}
          updateState={this.updateLocalState}
        />
      )
    }
  }

  return LocalState
}

export default createLocalState
