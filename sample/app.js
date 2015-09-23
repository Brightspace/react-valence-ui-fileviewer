'use strict';

var React = require('react'),
	FileViewer = require('../src/fileViewer.js');

var files = [
	{src: 'image1.jpg', name: 'JPG large'}
];

var Main = React.createClass({
	getInitialState: function() {
		return {
			src: null
		};
	},
	fileSelected: function(event) {
		var selectedFile = event.target.options[event.target.selectedIndex];
		this.setState({src: selectedFile.value});
	},
	render: function() {
		var viewer = this.state.src ? <FileViewer src={this.state.src} /> : null;
		return <div>
			<label>
				File:
				<select onChange={this.fileSelected}>
					<option value="">-- Select a File --</option>
					{this.props.files.map(function(file) {
						return <option key={file.src} value={file.src}>{file.name}</option>;
					})}
				</select>
			</label>
			<hr />
			{viewer}
		</div>;
	}
});

React.render(
	<Main files={files} />,
	document.getElementById('placeholder')
);
