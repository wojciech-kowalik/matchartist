import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';
const { isEmpty } = Ember;

export default Base.extend({

	tokenAttributeName: 'access-token',
	identificationAttributeName: 'uid'
});
