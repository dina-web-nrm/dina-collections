---
id: index
title: Style
sidebar_label: Style
---

This package is based on
[Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and
[Semantic UI docs](https://github.com/Semantic-Org/Semantic-UI-Docs). It defines
the styles used in the UI through the
[semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React)
components. Semantic UI and Semantic UI Docs are combined in this package to
simplify deployment of an up-to-date styleguide.

## Build and serve the style documentation locally

```
yarn build:docs
docpad run
```

Then go to http://127.0.0.1:9778.

Note that `docpad` has a fixed version below 6.80 due to a compatibility issue
with a [babel-plugin](https://github.com/docpad/docpad-plugin-babel/issues/9).
Until that has been resolved, the
[suggested fix](https://github.com/Semantic-Org/Semantic-UI-Docs/issues/404) is
to downgrade, as we have.

## Install and compile styles (CSS)

```
yarn
yarn build
```

## Import styles

The compiled styles are checked into `common/dist`. To use them, simply import
`semantic.css` at the entry point of the ui app.

```js
import 'common/dist/semantic.css'
```

## Develop styles and themes

To watch for changes in the style source files and automatically compile them,
run:

```
yarn start
```

Semantic UI has good [documentation](https://semantic-ui.com/usage/theming.html)
for how to improve styles and develop themes. Below is a quick overview of the
structure.

The default styles are defined in `src/definitions`. They often refer to
variables and the value of those variables are defined by a theme. Which theme
to be used is configured in `src/theme.config` and the themes are located in
`src/themes`.

We are currently using the `default` theme and the customisations we have had to
do are implemented in `src/site`. In `src/site/globals` there are
`site.overrides` and `site.variables` which can be used to define custom
overrides (in LESS) and variable values, which will apply for all styles. It is
also possible to define overrides and variables that will only apply for a
specific type of element. One example of this are the `accordion.overrides` and
`accordion.variables` in `src/site/modules`.
