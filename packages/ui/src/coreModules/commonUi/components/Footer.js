import React from 'react'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default () => {
  const size = 'large'
  return (
    <Segment id="footer" inverted style={{ padding: '5em' }} vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row data-testid="footer-content">
            <Grid.Column width={3}>
              <Header as="h4" content="Site" inverted />
              <List data-testid="footer-site" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="home" />
                    <NavLink data-testid="footer-start" to="/">
                      Start
                    </NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="user" />
                    <NavLink data-testid="footer-login" to="/login">
                      Login
                    </NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink data-testid="footer-data-model" to="/docs">
                      Data model
                    </NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Documentation" inverted />
              <List data-testid="footer-document" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="wikipedia" />
                    <a
                      data-testid="footer-dina-wiki"
                      href="https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!"
                    >
                      DINA wiki
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink
                      data-testid="footer-document-data-model"
                      to="/docs"
                    >
                      Data model
                    </NavLink>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Developer" inverted />
              <List data-testid="footer-developer" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="github" />
                    <a
                      data-testid="footer-dina-web-github"
                      href="https://github.com/DINA-Web"
                    >
                      DINA-Web Github
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <a
                      data-testid="footer-dina-collections-github"
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
                      data-testid="footer-dina-style"
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
                      data-testid="footer-dina-api-docs"
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
                      data-testid="footer-test-coverage"
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
