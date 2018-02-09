import { Grid } from 'semantic-ui-react'
import { Translate } from 'coreModules/i18n/components'
import LookupMammals from 'domainModules/collectionMammals/components/LookupMammals'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import React from 'react'

const RegisterMammal = () => (
  <PageTemplate>
    <h1>
      <Translate textKey="modules.lookupMammals.mammalsLookup" />
    </h1>
    <Grid textAlign="left" verticalAlign="middle">
      <Grid.Column>
        <LookupMammals />
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

export default RegisterMammal
