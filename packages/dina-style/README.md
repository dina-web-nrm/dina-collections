# DINA Semantic UI

## Overview

DINA Semantic UI is based on
[Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and [Semantic UI docs](https://github.com/Semantic-Org/Semantic-UI-Docs).

Its used to style the [DINA Collections UI](https://github.com/DINA-Web/ui) and in the fulture likely other DINA apps. Semantic UI and Semantic UI docs are combined to simplify deploying of an up-to-date styleguide.

## Usage in applications

The [DINA Collections UI](https://github.com/DINA-Web/ui) and future applications use DINA Semantic UI as a dependency like:

```
// in package.json
{
  dependencies: {
  ...
  "semantic-ui": "https://github.com/DINA-Web/dina-style.git",
  ...
  }
}

// in application
import 'semantic-ui/dist/semantic.css'
```

## Developing styles and theming

[Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and [Semantic UI docs](https://github.com/Semantic-Org/Semantic-UI-Docs) have good documentation for how to improve styles and develop themes, but when it comes to getting the documentation running, we have a custom process described below, since this repository is a merge of the two aforementioned repositories.

1. Install NodeJS through `nvm`. Follow the `nvm` install instructions in [DINA Collections UI](https://github.com/DINA-Web/ui)

2. Clone repository

```
git clone https://github.com/DINA-Web/dina-style.git
```

3. Install `gulp` globally

```
npm install --global gulp
```

4. Install local dependencies

```
npm install
```

5. Setup docpad

```
npm install --global docpad
docpad install eco
docpad update
docpad upgrade
```

6. Start docpad

```
docpad run
```

7. Compile styles (without shutting down docpad, e.g. run the command in another terminal window)

```
gulp build-docs
```

8. Visit docpad port (displayed in docpad run output) defaults to http://127.0.0.1:9778
