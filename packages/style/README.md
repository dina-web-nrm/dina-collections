# Style

This package is based on
[Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and
[Semantic UI docs](https://github.com/Semantic-Org/Semantic-UI-Docs). It defines
the styles used in the ui. Semantic UI and Semantic UI Docs are combined here to
simplify deployment of an up-to-date styleguide.

## Usage in applications

The compiled styles are checked into `common/dist`. To use them, simply import
`semantic.css` at the entry point of the ui app.

```js
import 'common/dist/semantic.css'
```

## Developing styles and theming

> TODO: Verify if this installation process still works

[Semantic UI](https://github.com/Semantic-Org/Semantic-UI) and
[Semantic UI Docs](https://github.com/Semantic-Org/Semantic-UI-Docs) have good
documentation for how to improve styles and develop themes, but when it comes to
getting the documentation running, we have a custom process described below,
since this repository is a merge of the two aforementioned repositories.

1. Install `gulp` globally

```
yarn global add gulp
```

2. Install local dependencies

```
yarn
```

3. Setup docpad

```
yarn global add docpad
docpad install eco
docpad update
docpad upgrade
```

4. Start docpad

```
docpad run
```

5. Compile styles (without shutting down docpad, e.g. run the command in another
   terminal window)

```
gulp build-docs
```

6. Visit docpad port (displayed in docpad run output) defaults to
   http://127.0.0.1:9778
