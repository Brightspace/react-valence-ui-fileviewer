var React = require('react'),
	getIconClassName = require('../../getIconClassName'),
	fileTypes = require('./fileTypes.js');

var Icon = React.createClass({
	propTypes: {
		mimeType: React.PropTypes.string
	},
	contextTypes: {
		getIntlMessage: React.PropTypes.func
	},
	getImageAltText: function() {
		var fileTypeName = fileTypes[this.props.mimeType];
		fileTypeName = (fileTypeName) ? 'Plugins.Generic.FileType.' +  fileTypeName : 'Plugins.Generic.FileType.Unknown';

		return this.context.getIntlMessage(fileTypeName);
	},
	render: function() {
		var className = 'vui-fileviewer-icon vui-fileviewer-icon-' + getIconClassName(this.props.mimeType);
		return (
			<span className={className}><span className="offscreen">{this.getImageAltText()}</span></span>
		);
	}
});

export default Icon;
