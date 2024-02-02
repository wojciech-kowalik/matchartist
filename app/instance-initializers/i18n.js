export default {
	name: 'i18n',
	initialize: function (application) {
		application.lookup('service:i18n').set('locale', calculateLocale());
	}
};

function calculateLocale() {
	/*
	let lang = navigator.language || navigator.userLanguage;

	if(lang.indexOf('-') > -1){
		let temp = lang.split('-');
		lang = temp[0];
	}
	*/

	return 'en';
}
