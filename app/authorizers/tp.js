import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';
const { isEmpty } = Ember;

export default Base.extend({

	tokenAttributeName: 'access-token',
	identificationAttributeName: 'uid',

	authorize(data, block) {

		const { tokenAttributeName, identificationAttributeName } = this.getProperties('tokenAttributeName', 'identificationAttributeName');
		const userToken = data[tokenAttributeName];
		const userIdentification = data[identificationAttributeName];

		if (!isEmpty(userToken) && !isEmpty(userIdentification)) {

			const authData = `${tokenAttributeName}="${userToken}", ${identificationAttributeName}="${userIdentification}"`;
			block('Authorization', `Token ${authData}`);
			block(tokenAttributeName, userToken);
			block(identificationAttributeName, userIdentification);
			block('client', data.client);

		}
	}
});
