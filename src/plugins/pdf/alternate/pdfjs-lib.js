// This module only exists to help unit testing the alternate viewer
// since PDFJS is not very unit test friendly.
// The real pdf.js is expected to be loaded from a CDN and is made accesible here via browserify-shim, but in
// tests we should mock this module instead.

import PDFJS from 'pdfjs';

export default PDFJS;
