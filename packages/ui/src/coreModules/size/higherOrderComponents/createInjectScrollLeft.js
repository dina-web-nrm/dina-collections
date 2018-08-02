import React, { Component } from 'react'

const createInjectScrollLeft = elementId => ComposedComponent => {
  class ScrollLeftInjector extends Component {
    constructor(props) {
      super(props)
      this.state = { scrollLeft: undefined }
      this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
      if (document) {
        const element = document.getElementById(elementId)
        if (element) {
          element.addEventListener('scroll', this.handleScroll)
        }
      }
    }

    componentWillUnmount() {
      if (document) {
        const element = document.getElementById(elementId)
        if (element) {
          element.removeEventListener('scroll', this.handleScroll)
        }
      }
    }

    handleScroll() {
      const { scrollLeft } = document.getElementById(elementId)

      this.setState({ scrollLeft })
    }

    render() {
      return (
        <ComposedComponent {...this.props} scrollLeft={this.state.scrollLeft} />
      )
    }
  }

  return ScrollLeftInjector
}

export default createInjectScrollLeft
