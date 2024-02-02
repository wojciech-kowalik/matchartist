export function initialize() {
    // Support older and newer style initializer calls
    const application = arguments[1] || arguments[0];
    [
        'component',
        'controller',
        'model',
        'route',
        'view'

    ].forEach(type => {
        application.inject(type, 'tpAjax', 'service:tp-ajax-promise');
    });
}

export default {
    name: 'tpAjax',
    initialize
};