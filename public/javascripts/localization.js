angular.module("totalrp", ['angularUtils.directives.dirPagination', 'ui.bootstrap'])
	.directive("contenteditable", function () {
		return {
			restrict: "A",
			require: "ngModel",
			link: function (scope, element, attrs, ngModel) {

				function read() {
					ngModel.$setViewValue(element.html());
				}

				ngModel.$render = function () {
					element.html(ngModel.$viewValue || "");
				};

				element.bind("blur keyup change", function () {
					scope.$apply(read);
				});
			}
		};
	})
	.controller("localizationCtrl", function ($scope, $http, $sce) {

		var testAddons = [
			{
				addOn: "Total RP 3",
				keys: [
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_2",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_3",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: true,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_4",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: true,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_5",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_6",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_7",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_8",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE_9",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
					{
						key: "GEN_NEW_VERSION_AVAILABLE",
						description: "This is the message displayed in a pop when Total RP 3 discover that an update is available (when you encouter someone with a newer version).",
						values: {
							enUS: {
								value: "A new version for Total RP 3 is available.\n\n|cffff0000Your version: %s\n|c0000ff00New version: %s|r\n\n|cffff9900We strongly encourage you to stay up-to-date.|r\n\nThis message will only appear once per session and can be disabled in the settings.",
								updatedOn: Date.now(),
								needsUpdate: false,
								updatedBy: user
							}
						}
					},
				]
			},
			{
				addOn: "Storyline",
				keys: []
			},
			{
				addOn: "Total RP 2",
				keys: []
			},
			{
				addOn: "Bookworm",
				keys: []
			}
		];
		$scope.languages = [
			{
				language: "enUS",
				label: "English"
			},
			{
				language: "frFR",
				label: "Français"
			},
			{
				language: 'esES',
				label: 'Spanish'
			}
		];

		$scope.newAddOn = {};
		$scope.newKey = {};
		$scope.newLanguage = {};
		$scope.user = user;
		$scope.newKeyValue = "";
		$scope.needSaving = false;
		$scope.selectedLanguage = 'enUS';
		$scope.itemsPerPage = 5;
		$scope.onlyShowKeysThatNeedUpdates = true;

		$scope.$watch('addOns', function (newNames, oldNames) {
			$scope.needSaving = true;
		}, true);

		$scope.renderPreview = function (text) {
			if (!text) return;
			return $sce.trustAsHtml(text.replace(/(?:\|c)(.{2})(.{2})(.{2})(.{2})([^|]*)(\|r)/g, "<span style=\"color:#$2$3$4\">$5</span>").replace(/(?:\|c)(.{2})(.{2})(.{2})(.{2})([^|]*)(\n)/g, "<span style=\"color:#$2$3$4\">$5</span>$6"))
		};

		$scope.createNewAddOn = function () {
			$scope.addOns.push($scope.newAddOn);
			$scope.newAddOn = {};
		};

		$scope.createNewKey = function (addOn) {
			if(!addOn.keys){
				addOn.keys = [];
			}
			addOn.keys.push({
				key: $scope.newKey.key,
				values: {
					enUS: {
						value: $scope.newKey.value,
						updatedOn: Date.now(),
						needsUpdate: false,
						updatedBy: user
					}
				}
			});
			$scope.newKey = {};
		};

		$scope.createNewLanguage = function () {
			$scope.languages.push($scope.newLanguage);
			$scope.newLanguage = {};
		};

		$scope.save = function () {
			$scope.needSaving = false;
			console.log($scope.addOns);
		};

		$scope.cancel = function () {
			$scope.addOns = JSON.parse(JSON.stringify(testAddons));
			$scope.needSaving = false;
		};

		$scope.revertValue = function (key) {
			key.valueInReview = null;
			key.needsReview = false;
		};

		$scope.saveReviewedValue = function (key) {
			key.value = key.valueInReview;
			key.valueInReview = null;
			key.needsReview = false;
		};

		$scope.filterByLanguages = function(){

		}
		$scope.addOns = testAddons;
	});