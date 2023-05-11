import sinon from 'sinon';

function getPdfjsMock() {
	return {
		getDocument: sinon.stub().returns(
			Promise.resolve({
				getPage: sinon.stub().returns(
					Promise.resolve({
						getViewport: sinon.stub().returns({
							width: 800,
							height: 600
						}),
						render: sinon.stub().returns({
							promise: Promise.resolve()
						})
					})
				),
				numPages: 2
			})
		),
		PDFLinkService: function() {
			/* eslint no-invalid-this: 0 */
			this.setDocument = sinon.stub();
			this.setViewer = sinon.stub();
		},
		PDFViewer: function() {
			/* eslint no-invalid-this: 0 */
			this.setDocument = sinon.stub();
			this.currentScale = '';
		}
	};
}

export default getPdfjsMock;
