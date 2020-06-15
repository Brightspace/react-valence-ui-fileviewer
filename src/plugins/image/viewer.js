'use strict';

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjAzZWY4ZjAyLTU4NDAtNDEwNS05Y2U1LTliMDRkZmY0YzgwMSJ9.eyJzdWIiOiIxNjkiLCJ0ZW5hbnRpZCI6ImJjMGQxMjFiLTQ5YmUtNDU4NS04ZTRlLTg5MjUzNzkyNDM2YSIsInNjb3BlIjoiKjoqOioiLCJqdGkiOiI3MzA1YzUwMy1mNjM1LTRlMTAtOGEzOS0zMzZhNDVhYTU5NjYiLCJpc3MiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJyaWdodHNwYWNlLmNvbS9hdXRoL3Rva2VuIiwiZXhwIjoxNTkyMjQyNTA3LCJuYmYiOjE1OTIyMzg5MDd9.AxSF9IdowyKN8SAVPmGjItMlv6DdqXBAlSKswRdWIo8187zibMgGHoZAtFuFaOfJLeNMCeP3jUvAMwGui331z6l2CzZY6gRg0qWKxVSKZUiTEU9Amjo0j6iK_63HV7XXMjfv3nMGY2ZkzKbf-7BKsqTj5S128Gu0KOSqJ5u71uMC8t83HV1l23sMGoVAch-W23BXDqVGRTBIGd_cIfCNS9jEjUPpXedRNsSSodUFhHPj8qHufXgF7n5z3rjCwG3qNonca3AQZtk1WV2gxrqjUET0Uqa58Ucdq65YvhIR8b60fjZMksb-brKw0L43bFF94cXIOcAOU75UbeF8fP_D8w';

var React = require('react'),
	ReactDOM = require( 'react-dom' );

var ImageViewer = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		resizeCallback: React.PropTypes.func
	},
	getInitialState: function() {
		if (token) {
			this.getDataUri(this.props.src);
			return { src: '' };
		}
		return { src: this.props.src };
	},
	componentWillMount: function() {
		this.updateProgress(0);
		if (this.props.resizeCallback) {
			this.props.resizeCallback('100%', true);
		}
	},
	componentDidMount: function() {
		this.updateProgress(100);
	},
	updateProgress: function(progress) {
		if (this.props.progressCallback) {
			this.props.progressCallback(progress, 'none');
		}
	},
	componentWillUnmount: function() {
		// without this, the file continues to download after being removed from the DOM
		ReactDOM.findDOMNode(this.refs.image).src = '';
	},
	getDataUri(href) {
		fetch(href, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		}).then(res => {
			return res.text();
		}).then(body => {
			var data = Buffer.from(body).toString('base64');
			var uri = `data:${this.props.mimeType};base64,${data}`;
			this.setState({ src: uri });
		});
	},
	render: function() {
		// Wrapped in a Div in order to prevent it from resizing to fit the dimensions of the flex-box
		return <div className="vui-fileviewer-image-container"><img ref="image" src={this.state.src} alt="" className="vui-fileviewer-image" /></div>;
	}
});

module.exports = ImageViewer;
