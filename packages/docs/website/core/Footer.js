/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/no-extraneous-dependencies */

const React = require('react')
const PropTypes = require('prop-types')

const propTypes = {
  config: PropTypes.object.isRequired,
}

class Footer extends React.Component {
  docUrl(doc, language) {
    const { baseUrl, docsUrl } = this.props.config

    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    return `${baseUrl}${docsPart}${langPart}${doc}`
  }

  pageUrl(doc, language) {
    const { baseUrl } = this.props.config
    return baseUrl + (language ? `${language}/` : '') + doc
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a className="nav-home" href={this.props.config.baseUrl}>
            {this.props.config.footerIcon && (
              <img
                alt={this.props.config.title}
                height="58"
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                width="66"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.props.config.dinaLinks.demo}>Get started</a>
            <a href={this.props.config.dinaLinks.demoLogin}>
              Documentation overview
            </a>
            <a href={this.props.config.dinaLinks.demoLogin}>System overview</a>
            <a href={this.props.config.dinaLinks.demoLogin}>Developer guide</a>
          </div>
          <div>
            <h5>Demo site</h5>
            <a href={this.props.config.dinaLinks.demo}>Start</a>
            <a href={this.props.config.dinaLinks.demoLogin}>Login</a>
          </div>
          <div>
            <h5>External documentation</h5>
            <a
              href={this.props.config.dinaLinks.apiDocs}
              rel="noopener noreferrer"
              target="_blank"
            >
              Swagger api
            </a>
            <a
              href={this.props.config.dinaLinks.dataModel}
              rel="noopener noreferrer"
              target="_blank"
            >
              Data model
            </a>
            <a
              href={this.props.config.dinaLinks.style}
              rel="noopener noreferrer"
              target="_blank"
            >
              Semantic ui style
            </a>
          </div>

          <div>
            <h5>More</h5>
            <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
            <a href={this.props.config.repoUrl}>GitHub</a>
            <a
              aria-label="Star this project on GitHub"
              className="github-button"
              data-count-aria-label="# stargazers on GitHub"
              data-count-href="DINA-Web/dina-collections/stargazers"
              data-icon="octicon-star"
              data-show-count="true"
              href={this.props.config.repoUrl}
            >
              Star
            </a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    )
  }
}
Footer.propTypes = propTypes
module.exports = Footer
