'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var user = require('./controllers/user.controller.js');

	// 'MAIN' ----------------------------
	app.route('/').get(main.index);
	app.route('/list').get(main.list);
	app.route('/save').post(main.getUrl);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

};
