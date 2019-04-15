# This is header

<!--- import-file-src: ./packages/scripts/src/js/interpolateFiles/testImport.md -->
<!---
This content is imported from ./packages/scripts/src/js/interpolateFiles/testImport.md using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

# This is heading-1

some content

## This is heading-2

### This is heading-3

And some content

<!--- import-file-end -->

<!--- import-file-src: ./packages/scripts/src/js/interpolateFiles/testImport.md -->
<!--- processor: heading-remove-level:1 -->
<!--- processor: heading-increment-level:2 -->
<!---
This content is imported from ./packages/scripts/src/js/interpolateFiles/testImport.md using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

some content

#### This is heading-2

## This is heading-2

##### This is heading-3

### This is heading-3

And some content

<!--- import-file-end -->

<!--- import-file-src: ./packages/scripts/src/js/interpolateFiles/testImport.js -->
<!--- processor: wrap-in-js-code-block -->
<!---
This content is imported from ./packages/scripts/src/js/interpolateFiles/testImport.js using interpolateFiles script.
Edits between this comment and import-file-end will be replaced when interpolateFiles script is run.
-->

```js
const a = 2

module.exports = function testImport() {
  return a
}
```

<!--- import-file-end -->

## This is content after import

### With sub header

And content
