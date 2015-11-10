'use strict';
require.config({
    paths: {
        angular: './public/libs/angular/angular.min',
        localStorageService: "./public/libs/angular-local-storage/dist/angular-local-storage.min",
        main: './main'
    },
    shim: {
        'angular' : { 'exports' : 'angular' },
        'localStorageService': ['angular']
    },
    priority: [ "angular" ]
});

require(['angular','main/index'], function(ng) {
    ng.element().ready(function() {ng.bootstrap(document, ['main']);});
});
