/*jshint node:true*/

var SilentError = require('silent-error');

module.exports = {

	description: 'Component data-grid generator',

	availableOptions: [
		{name: 'model', type: String, default: ''}
	],

	locals: function (options) {

		if (options.model === '') {
			throw new SilentError('The model is unknown. Add --model option and specify one.');
		}

		return {
			model: options.model
		};
	}
};
