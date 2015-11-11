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
                    // телефонный номер из формата +1 (123) 456 7890 в 1234567890
                    var phone_str = data[i]['phone'].replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                    // поиск только ДО символа @, так как при 'net' выдаст добрую кучу email в зоне .net
                    var email_str = data[i]['email'].split('@')[0];
                    if ( reg.test(data[i]['name']['first']) ||
                        reg.test(data[i]['name']['last']) ||
                        reg.test(phone_str) ||
                        reg.test(email_str) ) {
                        result.push(data[i]);
                    }
                }$scope.currentPage = 1;
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
    //
    return function(items, filterQuery) {
        var filtered = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                reg = new RegExp(filterQuery, 'i');
                if (reg.test(item['address']['street']) ||
                    reg.test(item['address']['city']) ||
                    reg.test(item['address']['state'] ||
                    reg.test(item['address']['zip'])) ||
                    reg.test(item['age']) ||
                    reg.test(item['company']) ) {
                        filtered.push(item);
                }
            }
        return filtered;
    };
});
