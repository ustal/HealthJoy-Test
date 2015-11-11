/**
 * Created by gio on 11.11.2015.
 */

var app = angular.module('plunker', ['ui.bootstrap']);

app.factory('userData', function ($http, $q) {
    var deferred = $q.defer();
    $http.get('/app/data.json').success(function(data) {
        deferred.resolve(data);
    });
    return deferred.promise;
});

app.controller('PaginationDemoCtrl', ['userData', '$scope', function (userData, $scope) {
    $scope.perPage = 10;
    $scope.currentPage = 1;
    users=userData;
    users.then(function(data) {
        usersData = data;
        $scope.noOfPages = Math.ceil(data.length/$scope.perPage);
        $scope.$watch('currentPage', function(){
            $scope.users = data.slice(($scope.currentPage-1)*$scope.perPage,$scope.currentPage*$scope.perPage);
        });

        $scope.pageChanged = function(page) {
            $scope.callbackPage = page;
        };
    });

    $scope.redraw = function() {
        users=userData;
        users.then(function (data) {
            //usersData = data;
            if ( $scope.searchQuery != '' ) {
                result = [];
                reg = new RegExp($scope.searchQuery, 'i');
                for (i in data) {
                    // поиск по имени первое, второе и email и тел номер
                    var phone_str = data[i]['phone'].replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                    if ( reg.test(data[i]['name']['first']) ||
                        reg.test(data[i]['name']['last']) ||
                        reg.test(phone_str) ) {
                        result.push(data[i]);
                    }
                }
            }
            else {
                result = data;
                $scope.currentPage = 1;
            }
            $scope.searchResult = result.length;
            $scope.noOfPages = Math.ceil(result.length/$scope.perPage);
            $scope.$watch('currentPage', function(){
                $scope.users = result.slice(($scope.currentPage-1)*$scope.perPage,$scope.currentPage*$scope.perPage);
            });

            $scope.pageChanged = function(page) {
                $scope.callbackPage = page;
            };
        });
    };
    // получение данных согласно условию поиска
    // формирование данных для пагинации
    // новый фильтр для полученных данных
}]);

app.filter('test', function() {
    // TODO в связи с асинхронной загрузкой фильтр применяется ДО загрузки data.json, соотв и items не существует.
    return function(items, filterQuery) {
        var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                reg = new RegExp(filterQuery, 'i');
                if (reg.test(item['address']['street']) ||
                    reg.test(item['address']['city']) ||
                    reg.test(item['address']['state'] ||
                    reg.test(item['address']['zip']))) {
                        filtered.push(item);
                }
            }
        return filtered;
    };
});
