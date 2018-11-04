import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header } from 'semantic-ui-react'

import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const PageNotFound = () => (
  <PageTemplate container fullViewHeight>
    <Grid columns={1} textAlign="left">
      <Grid.Column>
        <Header>The page you are looking for could not be found.</Header>
        Check the web address and try again. Or navigate to DINA Collections
        start page.
      </Grid.Column>
      <Grid.Column>
        <Link to="/">
          <Button primary>DINA Collections start</Button>
        </Link>
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

export default PageNotFound
