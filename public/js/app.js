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
			return {
				title: 'ゼルダの伝説 BotW',
				routes: _.map(routes, _.partial(_.pick, _, ['title', 'path']))
			};
		},

		methods: {
			closeMenu: function() {
				if (this.$refs.drawer.$el.classList.contains('is-visible')) {
					this.$refs.menu.$el.MaterialLayout.drawerToggleHandler_();
				}
			}
		},

		router: router
	};

	new Vue(app).$mount('#app');
})(window);
