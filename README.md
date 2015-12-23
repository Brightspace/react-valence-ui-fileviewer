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

```css
<link rel="stylesheet" href="https://s.brightspace.com/lib/pdf.js/1.2.109/pdf_viewer.css">
<link rel="stylesheet" type="text/css" href="dist/app.css">
```

```html
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

## Contributing
Contributions are welcome, please submit a pull request!

### Code Style

This repository is configured with [EditorConfig](http://editorconfig.org) and [eslint](http://eslint.org/) rules and contributions should make use of them.

[ci-url]: https://travis-ci.org/Brightspace/react-valence-ui-fileviewer
[ci-image]: https://img.shields.io/travis/Brightspace/react-valence-ui-fileviewer.svg
