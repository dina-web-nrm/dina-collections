import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react'

import { Markdown } from 'coreModules/i18n/components'

import logo from './logo.png'

class Start extends Component {
  render() {
    return (
      <div>
        <Segment
          style={{
            minHeight: 700,
            padding: '1em 0em',
          }}
          textAlign="center"
          vertical
        >
          <Container text>
            <Image
              centered
              size="small"
              src={logo}
              style={{ marginTop: '10em' }}
            />
            <Header
              as="h1"
              content="Collections UI"
              style={{
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
              }}
            />
            <Header
              as="h2"
              content="The DINA project develops an open-source Web-based information management system for natural history data"
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <a href="#footer">
              <Button color="blue" size="huge">
                Read more
                <Icon
                  name="down arrow"
                  style={{ margin: '0em -0.25em 0em 0.5em' }}
                />
              </Button>
            </a>
            <NavLink to="/login">
              <Button color="green" size="huge">
                Login
                <Icon name="right arrow" />
              </Button>
            </NavLink>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="top">
            <Grid.Row>
              <Grid.Column width={8}>
                <Segment padded="very">
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    Collection management for large installations
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    {`At the core of the system is support for assembling, managing
                  and sharing data associated with natural history collections
                  and their curation ("collection management"). Target
                  collections include zoological, botanical, geological and
                  paleontological collections, living collections, biodiversity
                  inventories, observation records, and molecular data. DINA is
                  primarily intended for large installations servicing the
                  collection management needs of a country, a region, or a large
                  institution.`}
                  </p>
                </Segment>
                <Divider horizontal />
                <Segment padded="very">
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    An international partnership for open-source development
                  </Header>
                  <p style={{ fontSize: '1.33em' }}>
                    {`DINA is developed by the DINA consortium, an unincorporated
                  international partnership among organizations and individuals
                  for collaborative open-source development. The DINA consortium
                  was founded in 2014 by six natural history collection
                  institutions in Europe and North America and is open to
                  additional members as detailed below. The DINA acronym stands
                  for "DIgital Information system for NAtural history data", and
                  has its roots in a Swedish initiative to replace a
                  heterogeneous collection of unsustainable in-house databases
                  with a modern, web-based national collection management
                  system.`}
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Segment padded="very">
                  <Markdown
                    fallbackLanguage="en"
                    textKey="modules.start.changelog"
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default Start
