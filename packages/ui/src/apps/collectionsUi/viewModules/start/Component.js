import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Divider, Grid, Header, Icon, Image } from 'semantic-ui-react'

import { version } from 'common/dist/repoVersionInfo.json'
import userSelectors from 'coreModules/user/globalSelectors'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import logo from './DINA_logo_only.png'

const mapStateToProps = state => {
  return {
    name: userSelectors.getName(state),
  }
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
}

class Start extends Component {
  render() {
    const { i18n: { moduleTranslate }, name } = this.props

    return (
      <React.Fragment>
        <Grid
          columns={2}
          container
          style={{ marginBottom: '8.5em', marginTop: '7em' }}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column width={9}>
            <Header
              as="h1"
              content={`${moduleTranslate({
                capitalize: true,
                module: 'start',
                textKey: 'welcome',
              })} ${name}! ${moduleTranslate({
                capitalize: true,
                module: 'start',
                textKey: 'startPageText',
              })}`}
              style={{
                color: '#000000a0',
                fontSize: '2.5em',
                fontWeight: 200,
                lineHeight: '2.5rem',
                marginBottom: '1em',
              }}
            />

            <NavLink to="/app/specimens/mammals/create/sections/0">
              <Button primary size="huge" type="button">
                <Icon name="plus" />
                {moduleTranslate({
                  capitalize: true,
                  module: 'start',
                  textKey: 'btnRegisterMammal',
                })}
              </Button>
            </NavLink>
            <NavLink to="/app/specimens/mammals">
              <Button basic primary size="huge" type="button">
                <Icon name="search" />
                {moduleTranslate({
                  capitalize: true,
                  module: 'start',
                  textKey: 'btnFindMammals',
                })}
              </Button>
            </NavLink>
            <div
              style={{
                color: '#000000a0',
                marginTop: '1em',
              }}
            >
              {moduleTranslate({
                capitalize: true,
                module: 'start',
                textKey: 'needHelp',
              })}{' '}
              <a href="mailto:support-dina@nrm.se">support-dina@nrm.se</a>
            </div>
          </Grid.Column>
          <Grid.Column width={7}>
            <Image centered src={logo} />
          </Grid.Column>
        </Grid>
        <Divider />
        <div style={{ color: '#000000a0', paddingLeft: '1em' }}>
          {moduleTranslate({
            capitalize: true,
            module: 'start',
            textKey: 'dinaCollections',
          })}{' '}
          <i>
            {moduleTranslate({
              capitalize: true,
              module: 'start',
              textKey: 'currentlyVersion',
            })}
            {version}
          </i>
        </div>
      </React.Fragment>
    )
  }
}

Start.propTypes = propTypes
export default compose(connect(mapStateToProps), withI18n())(Start)
