import config from 'config'
import React from 'react'
import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { UserManualLink } from 'coreModules/commonUi/components'

const { externalUrls } = config

export default () => {
  const size = 'large'
  return (
    <Segment id="footer" inverted style={{ padding: '5em' }} vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row data-testid="footerContent">
            <Grid.Column width={4}>
              <Header as="h4" content="Site" inverted />
              <List data-testid="footerSite" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="home" />
                    <NavLink data-testid="footerStart" to="/">
                      Home
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
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as="h4" content="Documentation" inverted />
              <List data-testid="footerDocument" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <UserManualLink />
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="database" />
                    <NavLink
                      data-testid="footerDocumentDataModel"
                      to="/dataModelDocs"
                    >
                      Data model documentation
                    </NavLink>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="wikipedia" />
                    <a
                      data-testid="footerDinaWiki"
                      href={externalUrls.wiki}
                      target="_blank"
                    >
                      DINA wiki
                    </a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" content="Development" inverted />
              <List data-testid="footerDeveloper" inverted link size={size}>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerDinaDeveloperDocs"
                      href={externalUrls.docs}
                      target="_blank"
                    >
                      Development documentation
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerDinaApiDocs"
                      href={`${externalUrls.api}/docs`}
                      target="_blank"
                    >
                      API documentation
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="external" />
                    <a
                      data-testid="footerDinaStyle"
                      href={externalUrls.style}
                      target="_blank"
                    >
                      Style guide
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <a
                      data-testid="footerDinaCollectionsGithub"
                      href={externalUrls.githubRepo}
                      target="_blank"
                    >
                      <Icon name="github" />
                      DINA Collections repository
                    </a>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Icon name="github" />
                    <a
                      data-testid="footerDinaWebGithub"
                      href={externalUrls.githubDina}
                      target="_blank"
                    >
                      DINA-Web repository
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
