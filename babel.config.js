module.exports = {
	presets: [
		["@babel/preset-env", {
			"useBuiltIns": "entry",
		  }],
		  [
			"@babel/preset-react",
			{
			  //"pragma": "dom", // default pragma is React.createElement (only in classic runtime)
			  //"pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
			  "throwIfNamespace": false, // defaults to true
			  "runtime": "automatic" // defaults to classic
			  // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
			}
		  ]
	],
	// sourceMaps: "inline",
	plugins: ['babel-plugin-rewire']
  };
