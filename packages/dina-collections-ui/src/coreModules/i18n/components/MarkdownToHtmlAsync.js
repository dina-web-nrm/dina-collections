import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { markdownToHtmlAsync } from '../utilities'

const propTypes = {
  markdown: PropTypes.string.isRequired,
}

class MarkdownToHtmlAsync extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: null,
    }
  }
  componentDidMount() {
    const { markdown } = this.props

    markdownToHtmlAsync(markdown).then(html => {
      this.setState({
        html,
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.setState({
        html: null,
      })
      markdownToHtmlAsync(nextProps.markdown).then(html => {
        this.setState({
          html,
        })
      })
    }
  }
  render() {
    if (this.state.html) {
      return <div dangerouslySetInnerHTML={{ __html: this.state.html }} /> // eslint-disable-line react/no-danger
    }
    return <div />
  }
}

MarkdownToHtmlAsync.propTypes = propTypes

export default MarkdownToHtmlAsync
