// Ionic Starter App

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_8KOsaO6opYOcuZ4HQod2wuYeQHYBq6s",
    authDomain: "datingapp-22ca2.firebaseapp.com",
    databaseURL: "https://datingapp-22ca2.firebaseio.com",
    projectId: "datingapp-22ca2",
    storageBucket: "datingapp-22ca2.appspot.com",
    messagingSenderId: "127062321249"
  };
  firebase.initializeApp(config);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'firebase', 'ionic.contrib.ui.tinderCards'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl as auth'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl as prof',
        resolve: {
          history: function($ionicHistory){
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
          },

          auth: function($state, Auth){
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          profile: function(Auth){
            return Auth.requireAuth().then(function(auth){
              return Auth.getProfile(auth.uid).$loaded();
            });
          }
        }
      }
    }
  })

  .state('app.match', {
    url: '/match',
    views: {
      'menuContent': {
        templateUrl: 'templates/match.html',
        controller: 'matchCtrl as matc',
        resolve: {
          history: function($ionicHistory){
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
          },

          auth: function($state, Auth){
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          uid: function(Auth){
            return Auth.requireAuth().then(function(auth){
              Auth.setOnline(auth.uid);
              return auth.uid;
            });
          },

          profile: function(Auth){
            return Auth.requireAuth().then(function(auth){
              return Auth.getProfile(auth.uid).$loaded();
            });
          }
        }
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl as home',
        resolve: {
          auth: function($state, Auth){
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          uid: function(Auth){
            return Auth.requireAuth().then(function(auth){
              return auth.uid;
            });
          }
        }
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings.html',
        controller: 'settingCtrl as sett',
        resolve: {
          auth: function($state, Auth){
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          }
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
