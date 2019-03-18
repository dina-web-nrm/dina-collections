import React from 'react'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default () => {
  const size = 'large'
  return (
    <Segment id="footer" inverted style={{ padding: '5em' }} vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row data-testid="footerContent">
            <Grid.Column width={3}>
              <Header as="h4" content="Site" inverted />
              <List data-testid="footerSite" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="home" />
                    <NavLink data-testid="footerStart" to="/">
                      Start
                    </NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="user" />
                    <NavLink data-testid="footerLogin" to="/login">
                      Login
                    </NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink data-testid="footerDataModel" to="/docs">
                      Data model
                    </NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Documentation" inverted />
              <List data-testid="footerDocument" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="wikipedia" />
                    <a
                      data-testid="footerDinaWiki"
                      href="https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!"
                    >
                      DINA wiki
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink data-testid="footerDocumentDataModel" to="/docs">
                      Data model
                    </NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Developer" inverted />
              <List data-testid="footerDeveloper" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="github" />
                    <a
                      data-testid="footerDinaWebGithub"
                      href="https://github.com/DINA-Web"
                    >
                      DINA-Web Github
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <a
                      data-testid="footerDinaCollectionsGithub"
                      href="https://github.com/DINA-Web/dina-collections"
                    >
                      <Icon name="github" />
                      Collections on Github
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerDinaStyle"
                      href="https://dina-style.nrm.se/"
                    >
                      Style guide
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerDinaApiDocs"
                      href="https://dina-api.nrm.se/docs"
                    >
                      Api documentation
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerTestCoverage"
                      href="/coverage/index.html"
                    >
                      Test coverage
                    </a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}
