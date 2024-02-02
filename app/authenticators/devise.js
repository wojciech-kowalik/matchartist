import Devise from 'ember-simple-auth/authenticators/devise';
import config from '../config/environment';

export default Devise.extend({

    serverTokenEndpoint: config.APP.API_URL + '/v1/auth/sign_in',
    resourceName: ''


});