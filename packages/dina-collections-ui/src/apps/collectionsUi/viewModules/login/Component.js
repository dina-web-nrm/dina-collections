import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { LoginForm } from 'coreModules/user/components'
import { requireLoggedOut } from 'coreModules/user/higherOrderComponents'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

import logo from './logo.png'

const Login = () => (
  <PageTemplate hasFixedMenu>
    <div className="login-form">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ marginTop: 100, maxWidth: 450 }}>
          <Image centered src={logo} style={{ height: 70, marginBottom: 20 }} />
          <LoginForm />
        </Grid.Column>
      </Grid>
    </div>
  </PageTemplate>
)

export default requireLoggedOut(Login)
