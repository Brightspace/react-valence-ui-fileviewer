# react-valence-ui-fileviewer
[![Build status][ci-image]][ci-url]

React component for viewing different types of files (HTML, media, documents, etc.).

## Installation

Install NPM dependencies:

```shell
npm install
```

Additionally, to get the fallback (non-native) PDF renderer working, you will need to reference some dependencies from the CDN.
These must be referenced _before_ referencing the css and js files containing the code for this component.

If switching to a newer version of pdf.js, [pdf.settings.js](https://github.com/Brightspace/valence-ui-pdfjs-settings) may need to be updated.

```css
<link rel="stylesheet" href="https://s.brightspace.com/lib/pdf.js/1.2.109/pdf_viewer.css">
<link rel="stylesheet" type="text/css" href="dist/app.css">
```

```html
<script src="https://s.brightspace.com/lib/pdf.js/1.2.109/pdf.settings.js"></script>
<script src="https://s.brightspace.com/lib/pdf.js/1.2.109/compatibility.js"></script>
<script src="https://s.brightspace.com/lib/pdf.js/1.2.109/pdf.js"></script>
<script src="https://s.brightspace.com/lib/pdf.js/1.2.109/pdf_viewer.js"></script>
<script src="dist/app.js"></script>
```

If you want to incorporate this component and build it from source you will also need to use browserify-shim to configure the PDFJS global variable.

```json
(in package.json)

"browserify": {
  "transform": [
    "browserify-shim"
  ]
},
"browserify-shim": {
  "pdfjs": "global:PDFJS"
}
```

## Testing

This project uses the [Jest](https://facebook.github.io/jest/) unit testing framework. To run the unit tests:

```shell
npm run test:unit
```

Code is also linted using [eslint](http://eslint.org/):

```shell
npm run lint
```

Both unit tests and linting is performed during CI builds as part of the `test` script:

```shell
npm test
```

## Sample

Included is a sample application which allows you to launch the file viewer with many different file types. To build the sample application, run:

```shell
npm run build-sample
```

To serve the sample application, run:

```shell
npm run serve
```

Then open `http://localhost:8080/` in your browser.

## Parameters
FileViewer has the following parameters:

`progressCallback` Takes a callback function, which should accept 2 parameters, the first reflecting the progress, and the second reflecting the accuracy of the progress value.

* progress: A number between 0 and 100 indicating the percentage loaded.
* accuracy: The accuracy of the returned progress value, currently we choose between two options:
	* `certain`: indicates that progress will be a number between 0 and 100
	* `guess`: indicates that progress will be a number between 0 and 100, and that the progress may not be accurate
	* `none`: indicates that it will only pass in progress values of 0 or 100

```
resizeCallback ( size, sizeKnown )
```
* A callback reporting on the size of the viewer's contents.

`size`
* A `string` value for the size of the viewer if we can find it out.
* `null` if the viewer should just be sized to the container height.

`sizeKnown`
* True if the size is known.
* False if the size is not known.

## Contributing
Contributions are welcome, please submit a pull request!

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) and [eslint](http://eslint.org/) rules and contributions should make use of them.

[ci-url]: https://travis-ci.org/Brightspace/react-valence-ui-fileviewer
[ci-image]: https://img.shields.io/travis/Brightspace/react-valence-ui-fileviewer.svg

## Versioning & Releasing

> TL;DR: Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`. Read on for more details...
The [sematic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/master/semantic-release) is called from the `release.yml` GitHub Action workflow to handle version changes and releasing.

### Version Changes

All version changes should obey [semantic versioning](https://semver.org/) rules:
1. **MAJOR** version when you make incompatible API changes,
2. **MINOR** version when you add functionality in a backwards compatible manner, and
3. **PATCH** version when you make backwards compatible bug fixes.

The next version number will be determined from the commit messages since the previous release. Our semantic-release configuration uses the [Angular convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) when analyzing commits:
* Commits which are prefixed with `fix:` or `perf:` will trigger a `patch` release. Example: `fix: validate input before using`
* Commits which are prefixed with `feat:` will trigger a `minor` release. Example: `feat: add toggle() method`
* To trigger a MAJOR release, include `BREAKING CHANGE:` with a space or two newlines in the footer of the commit message
* Other suggested prefixes which will **NOT** trigger a release: `build:`, `ci:`, `docs:`, `style:`, `refactor:` and `test:`. Example: `docs: adding README for new component`

To revert a change, add the `revert:` prefix to the original commit message. This will cause the reverted change to be omitted from the release notes. Example: `revert: fix: validate input before using`.

### Releases

When a release is triggered, it will:
* Update the version in `package.json`
* Tag the commit
* Create a GitHub release (including release notes)
* Deploy a new package to NPM

### Releasing from Maintenance Branches

Occasionally you'll want to backport a feature or bug fix to an older release. `semantic-release` refers to these as [maintenance branches](https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration#maintenance-branches).

Maintenance branch names should be of the form: `+([0-9])?(.{+([0-9]),x}).x`.

Regular expressions are complicated, but this essentially means branch names should look like:
* `1.15.x` for patch releases on top of the `1.15` release (after version `1.16` exists)
* `2.x` for feature releases on top of the `2` release (after version `3` exists)

[npm-url]: https://www.npmjs.org/package/frau-appconfig-builder
[npm-image]: https://img.shields.io/npm/v/frau-appconfig-builder.svg
