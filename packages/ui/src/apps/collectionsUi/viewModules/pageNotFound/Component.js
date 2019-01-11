import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header } from 'semantic-ui-react'

import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const PageNotFound = () => (
  <PageTemplate container fullViewHeight>
    <Grid columns={1} textAlign="left">
      <Grid.Column>
        <Header as="h1">Sorry, the page could not be found.</Header>
        <p>
          You may want to check the web address or perhaps that page does not
          exist anymore.
        </p>
      </Grid.Column>
      <Grid.Column>
        <Link to="/">
          <Button primary>Go to Dina Collections start page</Button>
        </Link>
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

export default PageNotFound
