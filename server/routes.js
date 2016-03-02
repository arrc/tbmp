'use strict';

module.exports = function(app){
	var main = require('./controllers/main.controller.js');
	var user = require('./controllers/user.controller.js');
	var url = require('./controllers/url.controller.js');

	// 'MAIN' ----------------------------
	app.route('/').get(main.index);
	app.route('/t/list').get(main.list);
	app.route('/t/save').post(main.getUrl);
	app.route('/t/profile').get(main.profile);
	app.route('/t/topics').get(main.topics);
	app.route('/t/urls').get(main.urls);

	// 'USER'
	app.route('/login').post(user.login);
	app.route('/signup').post(user.signup);
	app.route('/api/profile').get(user.profile);

	// 'URL'
	app.route('/url').get(url.retriveUrls);
	app.route('/url').post(url.saveUrl);

};
