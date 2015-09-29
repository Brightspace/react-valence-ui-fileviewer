'use strict';

var React = require('react'),
	FileViewer = require('../src/fileViewer.js');

var files = [
	{src: 'image1.jpg', name: 'Toronto (JPG large)', size: 1361550},
	{src: 'image2.png', name: 'Winnipeg (PNG medium)', size: 1272270},
	{src: 'image3.gif', name: 'Kitchener (GIF medium)', size: 414555},
	{src: 'image4.svg', name: 'Canada Map (SVG)', size: 66724},
	{src: 'audio.mp3', name: 'Audio (MP3)', size: 10},
	{src: 'generic1.abc', name: 'Generic (ABC)', size: 102932}
];

var Main = React.createClass({
	getInitialState: function() {
		return {
			file: null
		};
	},
	fileSelected: function(event) {
		this.setState({file: files[event.target.selectedIndex - 1]});
	},
	render: function() {
		var viewer = this.state.file ?
			<FileViewer
				src={'files/' + this.state.file.src}
				srcdownload={'files/' + this.state.file.src}
				size={this.state.file.size} /> : null;
		return <div>
			<div className="file-selector">
				<h1>File Viewer Sample Application</h1>
				<label>
					File:
					<select onChange={this.fileSelected}>
						<option value="">-- Select a File --</option>
						{this.props.files.map(function(file) {
							return <option key={file.src}>{file.name}</option>;
						})}
					</select>
				</label>
			</div>
			<hr />
			{viewer}
		</div>;
	}
});

React.render(
	<Main files={files} />,
	document.getElementById('placeholder')
);
