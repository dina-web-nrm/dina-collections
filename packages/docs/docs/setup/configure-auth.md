---
id: configure-auth
title: Configure auth
sidebar_label: Configure auth
---

## Configure authentication

We are using keycloak for user authentication and either you disable
authentication or [setup keycloak](#run-and-configure-keycloak)

> TODO: Explain how to disable auth

### Start keycloak

```bash
make up-keycloak
```

It will take a while for keycloak to start.

> TODO: Explain how to read keycloak logs

### Import keycloak dev configuration

- Open keycloak admin interface <http://127.0.0.1:8080>
- Navigate to Administration Console
- Login with user: admin, password: admin (if you have not changed the
  `./env/.keycloak`)
- Inspect top left nav item (should be dina)

### Add test user

- Press "Users" under "Manage" section in left nav. (Make sure the dina realm is
  selected)
- Add user with the following params:

  ```bash
    username = john doe
    Email = johndoe@nrm.se
    First Name = John
    Last Name = Doe
  ```

- Press save
- Navigate to credentials and set password and confirm (switch "temporary" to
  "off" first)
- Press the red save button
