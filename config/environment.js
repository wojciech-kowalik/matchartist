/* jshint node: true */

module.exports = function (environment)
{

	var ENV = {

		modulePrefix: 'frontend',
		podModulePrefix: 'frontend/bundles',
		environment: environment,
		baseURL: '/',
		locationType: 'auto',
		EmberENV: {

			FEATURES: {},

			EXTEND_PROTOTYPES: {
				Date: false
			}
		},

		contentSecurityPolicy: {
			'connect-src': "*"
		},

		APP: {
			// roles
			CASTING_COMPANY_ROLE: 'casting_company',
			ACTOR_ROLE: 'actor',
			AGENT_ROLE: 'agent',

			// general
			API_URL: 'http://52.42.40.56:8080',
			FRONTEND_URL: 'http://52.42.40.56:4200',

			USERS_URL_TYPE: 'users',
			AUTH_URL_TYPE: 'auth',
			AUTH_PASSWORD_URL_TYPE: 'auth/password',
			ACTOR_ROLES_TYPE: 'actors/me/roles',

			// embedded
			FIND_RECORD: 	'findRecord',
			FIND_ALL: 		'findAll',
			CREATE_RECORD: 	'createRecord',
			UPDATE_RECORD: 	'updateRecord',
			DELETE_RECORD: 	'deleteRecord',
			QUERY: 			'query',

			constans: {

				genders: [
					{
						label: 'male',
						value: 'm'
					},
					{
						label: 'female',
						value: 'f'
					},
					{
						label: 'transgender',
						value: 't'
					}
				],

				countries: [
					{
						label: 'Poland',
						value: 'pl'
					},
					{
						label: 'England',
						value: 'en'
					},
					{
						label: 'Sweden',
						value: 'se'
					}
				]

			},

		},

		i18n: {
			defaultLocale: 'en'
		},

		moment: {
			includeTimezone: 'all',
			includeLocales: true
		},

		// config section for particular component
		components: {

			"tp-media": {
				uploadServer: 'http://52.42.40.56:8080/v1/'
			},
			"question-actor": {
				uri: '/v1/roles/{role_id}/actors/{actor_id}/questions/{question_id}/answer'
			},
			"role-apply": {
				uri: '/v1/actors/me/roles/{role_id}/hearings/{hearing_id}/attend'
			},
			"actor-content": {
				uri: '/v1/casting_companies/{company_id}/favourite_actors'
			},
			"actor-invites": {
				uri: '/v1/actors/{actor_id}/invites'
			},
			"actor-profile-request-agent": {
				uri: '/v1/actors/me/request_agent'
			}
		}
	};

	ENV['ember-simple-auth'] = {

		routeAfterAuthentication: 'profile',
		routeIfAlreadyAuthenticated: 'profile'
	}

	if (environment === 'development') {

		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;

	}

	if (environment === 'test') {

		// Testem prefers this...
		ENV.baseURL      = '/';
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS      = false;

		ENV.APP.rootElement = '#ember-testing';
	}

	if (environment === 'production') {

	}

	ENV['ember-loading-route'] = {
		enabled: true,
		commonRoutes: [
			{
				templateName: 'partials/loader'
			}
		]
	};

	return ENV;
};
