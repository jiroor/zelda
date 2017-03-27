(function(global) {
	'use strict';

	Vue.use(VueMdl.default);

	var routes = [{
		title: 'Home',
		path: '/',
		component: using('page.home')
	}, {
		title: 'Tips',
		path: '/tips',
		component: using('page.tips')
	}, {
		title: 'Recipe',
		path: '/recipe',
		component: using('page.recipe')
	}];

	var router = new VueRouter({
		routes: routes
	});

	var app = {
		data: function() {
			var self = this;

			return {
				title: 'ゼルダの伝説 BotW',
				routes: _.map(routes, _.partial(_.pick, _, ['title', 'path'])),

				showDrawer: false
			};
		},

		methods: {
			to: function(path) {
				var self = this;

				self.showDrawer = false;
			}
		},

		router: router
	};

	new Vue(app).$mount('#app');
})(window);
