define([
    'angular',
    'localStorageService'
], function (ng) {
    'use strict';
    return ng.module('main', ['LocalStorageModule'])
            .run(['$rootScope', function($rootScope){$rootScope.pageTitle = 'Users List'}])
});