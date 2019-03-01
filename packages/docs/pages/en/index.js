/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies, react/no-multi-comp */

const React = require('react')
const PropTypes = require('prop-types')

const homePropTypes = {
  language: PropTypes.string,
  siteConfig: PropTypes.object.isRequired,
}

const homeDefaultProps = {
  language: '',
}

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = '' } = this.props
    const { baseUrl, docsUrl } = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('setup/setup.html')}>Setup</Button>
            <Button
              href={docUrl('documentationOverview/documentationOverview.html')}
            >
              Documentation Overview
            </Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

HomeSplash.propTypes = homePropTypes
HomeSplash.defaultProps = homeDefaultProps

const indexPropTypes = {
  config: PropTypes.object.isRequired,
  language: PropTypes.string,
}

const indexDefaultProps = {
  language: '',
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props
    return (
      <div>
        <HomeSplash language={language} siteConfig={siteConfig} />
      </div>
    )
  }
}

Index.propTypes = indexPropTypes
Index.defaultProps = indexDefaultProps

module.exports = Index
