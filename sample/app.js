var React = require('react'),
	ReactDOM = require( 'react-dom' ),
	FileViewer = require('../src/fileViewer.js');

var files = [
	{src: 'image1.jpg', name: 'Toronto (JPG large)'},
	{src: 'image2.png', name: 'Winnipeg (PNG medium)'},
	{src: 'image3.gif', name: 'Kitchener (GIF medium)'},
	{src: 'image4.svg', name: 'Canada Map (SVG)'},
	{src: 'hello.bmp', name: 'Hello (BMP)'},
	{src: 'audio.mp3', name: 'Audio (MP3)'},
	{src: 'pdf1.pdf', name: 'PDF (Cooking)'},
	{src: 'pdf2.pdf', name: 'PDF (Sample)'},
	{src: 'pdf3.pdf', name: 'PDF (Large)'},
	{src: 'generic1.abc', name: 'Generic (ABC)'},
	{src: 'largeGeneric.txt', name: 'Generic (TXT)'},
	{src: 'html1.html', name: 'HTML1 (HTML)'},
	{src: 'scrollingHtml.html', name: 'ScrollingHtml (HTML)'}
];

var Main = React.createClass({
	getInitialState: function() {
		return {
			file: null,
			locale: 'en-CA'
		};
	},
	fileSelected: function(event) {
		this.setState({file: files[event.target.selectedIndex - 1]});
	},
	localeSelected: function(event) {
		var dir = event.target.value === 'ar-SA' ? 'rtl' : 'ltr';
		this.setState({
			locale: event.target.value,
			direction: dir
		});
	},
	logProgress: function(progress) {
		console.log(this.state.file.src + ' - ' + progress + '/100');
	},
	render: function() {
		var viewer = this.state.file ?
			<FileViewer
				progressCallback={this.logProgress}
				src={'files/' + this.state.file.src}
				srcdownload={'files/' + this.state.file.src}
				locale={this.state.locale} /> : null;
		return <div dir={this.state.direction}>
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
				<label>
					Locale:
					<select onChange={this.localeSelected}>
						<option value="">-- Select a Locale --</option>
						<option value="ar-SA">AR Arabic (ar-SA)</option>
						<option value="en-CA">CDN English(en-CA)</option>
						<option value="en-CA">UK English(en-GB)</option>
						<option value="en-US">US English(en-US)</option>
						<option value="es-MX">ES Spanish(es-MX)</option>
						<option value="fr-CA">Français Canada(fr-CA)</option>
						<option value="en-US">JA Japanese(ja)</option>
						<option value="ko-KR">KR Korean (ko-KR)</option>
						<option value="pt-BR">Português Brasil(pt-BR))</option>
						<option value="sv-SE">SE Swedish(sv-SE)</option>
						<option value="tr-TR">TR Turkish(tr-TR)</option>
						<option value="zh-CN">CN Chinese(zh-CN)</option>
						<option value="zh-TW">TW Chinese(zh-TW)</option>
					</select>
				</label>
			</div>
			<hr />
			{viewer}
		</div>;
	}
});

ReactDOM.render(
	<Main files={files} />,
	document.getElementById('placeholder')
);
