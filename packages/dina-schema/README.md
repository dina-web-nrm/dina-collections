# DINA schema

Dina schema contains our api documentation and json schemas for domain models.
It builds swagger and openApi specification and domain models from
./src/specification to ./build. It also uses swagger and openApi specification
to generate documentation currently available [here](https://alpha-api-docs.dina-web.net/?url=https://alpha-api-docs.dina-web.net/openApi.json&docExpansion=false&defaultModelRendering=model&defaultModelExpandDepth=0)

## Get started

### Installation

This guide assumes you have `git` installed

1. [Install nvm](https://github.com/creationix/nvm#installation)
2. Install Node.js version 8.9.1

```
nvm install 8.9.1
```

3. Set Node v8.9.1 as default

```
nvm alias default v8.9.1
```

4. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
5. Clone the repository

```
git clone https://github.com/DINA-Web/dina-schema.git
```

6. Move into directory

```
cd dina-schema
```

7. Install dependencies

```
yarn
```

8. Run tests

```
yarn test
```

### Run app

9. Start development server

```
yarn start
```
