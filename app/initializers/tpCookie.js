export function initialize() {

    const application = arguments[1] || arguments[0];
    [
        'component',
        'controller',
        'model',
        'route',
        'view'

    ].forEach(type => {
        application.inject(type, 'cookie', 'cookie:main');
    });
}

export default {
    name: 'tpCookie',
    initialize: initialize
};
