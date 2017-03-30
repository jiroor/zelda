(function(global) {
	'use strict';

	var tips = {
		data: function() {
			// constant
			this.C = {
				categoryAll: '全て'
			};

			// cache
			this.c = {
				originTips: []
			};

			return {
				categories: [],
				tips: [],

				filterBy: {
					category: this.C.categoryAll,
					keyword: ''
				}
			};
		},

		created: function() {
			var promises = {
				tips: this.getTips()
			};

			Promise.props(promises);
		},

		methods: {
			getTips: function() {
				var req = {
					url: '/zelda/tips',
					data: {}
				};

				return using('fetch').api(req)
					.then((data) => {
						this.categories = [this.C.categoryAll].concat(_.chain(data).map('category').uniq().value());
						this.c.originTips = this.tips = data;
					});
			},

			select: function() {
				this.$refs.select.$refs.menu.MaterialMenu.hide();
			},

			filter: function() {
				var targets = this.c.originTips;

				if (!_.eq(this.filterBy.category, this.C.categoryAll)) {
					targets = _.filter(targets, ['category', this.filterBy.category]);
				}

				if (this.filterBy.keyword) {
					targets = _.filter(targets, (tip) => {
						return _.includes(tip.title, this.filterBy.keyword) || _.includes(tip.description, this.filterBy.keyword);
					});
				}

				this.tips = targets;

				this.$refs.filter.close();
			}
		},

		template: '#template--page--tips'
	};

	namespace('page.tips', tips);
})(window);
