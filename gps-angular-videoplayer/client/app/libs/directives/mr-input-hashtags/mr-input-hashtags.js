/*eslint */
/*global angular */
(function () {
    "use strict";

    angular.module("com.mondayreplay.libs.directives.mrInputHashtags", [])
        .directive("mrInputHashtags", ["Hashtag", function (Hashtag) {
            return {
                restrict: "E",
                templateUrl: "app/libs/directives/mr-input-hashtags/mr-input-hashtags.html",
                scope: {
                    selectedHashtags: "=",
                    requireMatch: "=",
                    placeholder: "@"
                },
                controller: function ($scope) {
                    var _this = this;

                    _this.selectedHashtags = $scope.selectedHashtags;
                    _this.requireMatch = $scope.requireMatch;
                    _this.placeholder = $scope.placeholder;

                    _this.selectedItem = null;
                    _this.searchText = null;
                    _this.querySearch = function (query) {
                        return query ? _this.allHashtags.filter(createFilterFor(query)) : [];
                    };

                    function createFilterFor(query) {
                        var lowercaseQuery = angular.lowercase(query);
                        return function filterFn(hashtag) {
                            return angular.lowercase(hashtag).indexOf(lowercaseQuery) === 0;
                        };
                    }

                    Hashtag.search(undefined, undefined, undefined, 0, 0, function (data) {
                        _this.allHashtags = data.hashtags;

                    }, function (data, status) {
                        _this.allHashtags = [];
                    });

                    /**
                     * Search Text Updated
                     */
                    _this.onSearchTextChange = function() {
                        _this.searchText = angular.lowercase(_this.searchText);
                    };

                    /**
                     * in case of 'space' fires 'enter'
                     */
                    _this.onKeyDown = function(event) {
                        if (event.keyCode === 32) {

                            var autoChild = document.getElementById('auto-complete').firstElementChild;
                            var el = angular.element(autoChild);
                            event.keyCode = 13;
                            el.scope().$mdAutocompleteCtrl.keydown(event);

                            var chipEle = document.getElementById('hashtag-chip').firstElementChild;
                            el = angular.element(chipEle);
                            el.scope().$mdChipsCtrl.inputKeydown(event);
                        }
                    };
                },
                controllerAs: 'ctrl'
            };
        }]);
})();
