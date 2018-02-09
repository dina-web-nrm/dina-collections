import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import globalSelectors from '../globalSelectors'

const mapStateToProps = state => {
  return {
    language: globalSelectors.getLanguage(state),
    markdown: globalSelectors.getMarkdown(state),
    translations: globalSelectors.getTranslations(state),
  }
}
const childContextTypes = {
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
}
const propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

class I18nProvider extends Component {
  getChildContext() {
    const { language, markdown, translations } = this.props
    return { language, markdown, translations }
  }

  render() {
    return (
      <div key={this.props.language}>{Children.only(this.props.children)}</div>
    )
  }
}

I18nProvider.childContextTypes = childContextTypes
I18nProvider.propTypes = propTypes

// using withRouter to avoid location updates being blocked
// https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default compose(withRouter, connect(mapStateToProps))(I18nProvider)
