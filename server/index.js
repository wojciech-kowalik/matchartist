// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

var bodyParser = require('body-parser');
var globSync = require('glob').sync;
var routes = globSync('./routes/**/*.js', {cwd: __dirname}).map(require);

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.post('/v1/auth/sign_in', function (req, res) {
        return res.status(200).send({user: {id: 1, email: 'wojciech.kowalik@visualnet.pl'}});
    });
    app.get('/v1/users', function (req, res) {
        return res.status(200).send({user: {id: 1, email: 'wojciech.kowalik@visualnet.pl', isAttributeRequired: true}});
    });
    app.put('/api/v1/actors/1/attributes/0', function (req, res) {
        return res.status(200).send({});
    });
    app.get('/api/actors/1/attributes', function (req, res) {
        return res.status(200).send([
                {
                    user: 1,
                    attribute_value_id: 1,
                    attribute: {
                        attribute_id: 0,
                        name: "eye color",
                        description: "string",
                        type: "boolean",
                        range_from: 0,
                        range_to: 0,
                        combo_option: [
                            {
                                attribute_combo_option_id: 1,
                                name: "green"
                            },
                            {
                                attribute_combo_option_id: 2,
                                name: "brown"
                            },
                        ]
                    },
                    has_value: true,
                    value: "string",
                    details: "string"
                },
                {
                    user: 1,
                    attribute_value_id: 2,
                    attribute: {
                        attribute_id: 0,
                        name: "hair color",
                        description: "string",
                        type: "boolean",
                        range_from: 0,
                        range_to: 0,
                        combo_option: [
                            {
                                attribute_combo_option_id: 1,
                                name: "blond"
                            },
                            {
                                attribute_combo_option_id: 12,
                                name: "black"
                            },
                        ]
                    },
                    has_value: true,
                    value: "string",
                    details: "string"
                },
                {
                    user: 1,
                    attribute_value_id: 3,
                    attribute: {
                        attribute_id: 0,
                        name: "height",
                        description: "string",
                        type: "boolean",
                        range_from: 0,
                        range_to: 0,
                        combo_option: [
                            {
                                attribute_combo_option_id: 1,
                                name: "150-160 cm"
                            },
                            {
                                attribute_combo_option_id: 12,
                                name: "161-180 cm"
                            },
                        ]
                    },
                    has_value: true,
                    value: "string",
                    details: "string"
                },
                {
                    user: 1,
                    attribute_value_id: 4,
                    attribute: {
                        attribute_id: 0,
                        name: "weihgt",
                        description: "string",
                        type: "boolean",
                        range_from: 0,
                        range_to: 0,
                        combo_option: [
                            {
                                attribute_combo_option_id: 1,
                                name: "50-60 kg"
                            },
                            {
                                attribute_combo_option_id: 12,
                                name: "61-70 kg"
                            },
                        ]
                    },
                    has_value: true,
                    value: "string",
                    details: "string"
                }
            ]
        );
    });

    routes.forEach(function (route) {
        route(app);
    });
}
