app.directive('tab', function() {
	return {
		restrict: 'E',
		transclude: true,
		template: '<div class="content" ng-show="active"><h3>Title</h3><p ng-transclude></p></div>',
		require: '^tabset',
		scope: {
			heading: '@'
		},
		link: function(scope, elem, attr, tabsetController) {
			scope.active = false;
			tabsetController.addTab(scope);
		}
	}
});

app.directive('tabset', function() {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		templateUrl: 'directives/tabset.html',
		bindToController: true,
		controllerAs: 'tabset',
		controller: function() {
			var self = this;

			self.tabs = [];

			self.addTab = function(tab) {
				self.tabs.push(tab);

				if (self.tabs.length === 1) {
					tab.active = true;
				}
			};

			self.select = function(selectedTab) {
				for (var i = 0; i < self.tabs.length; i++) {
					if (self.tabs[i].active && self.tabs[i] !== selectedTab) {
						self.tabs[i].active = false;
					}
				}

				selectedTab.active = true;
			}
		}
	}
})