(function(global) {
	'use strict';

	var Home = {
		template: '<div>home</div>'
	};
	var Tips = {
		template: '<div>tips</div>'
	};
	var Recipe = {
		template: '<div>recipe</div>'
	};

	var routes = [{
		title: 'Home',
		path: '/',
		component: Home
	}, {
		title: 'Tips',
		path: '/tips',
		component: Tips
	}, {
		title: 'Recipe',
		path: '/recipe',
		component: Recipe
	}];

	var router = new VueRouter({
		routes: routes
	});

	var app = {
		data: function() {
			var self = this;

			return {
				title: 'ゼルダの伝説 BotW',

				routes: _.map(routes, _.partial(_.pick, _, ['title', 'path']))
			};
		},

		router: router
	};

	new Vue(app).$mount('#app');
})(window);
