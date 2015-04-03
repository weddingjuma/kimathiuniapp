angular.module('bucketList', ['ionic', 'ionMdInput', 'firebase', 'bucketList.controllers', 'ionic.map'])

.run(function($ionicPlatform, $rootScope, $firebaseAuth, $firebase, $window, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        $rootScope.userEmail = null;
        //replace with owm firebase url
        $rootScope.baseUrl = 'https://dekutapp.firebaseio.com/';
        var authRef = new Firebase($rootScope.baseUrl);
        $rootScope.auth = $firebaseAuth(authRef);

        $rootScope.show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        };

        $rootScope.hide = function() {
            $ionicLoading.hide();
        };

        $rootScope.notify = function(text) {
            $rootScope.show(text);
            $window.setTimeout(function() {
                $rootScope.hide();
            }, 1999);
        };

        $rootScope.logout = function() {
            $rootScope.auth.$logout();
            $rootScope.checkSession();
        };

        $rootScope.checkSession = function() {
            var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
                if (error) {
                    // no action yet.. redirect to default route(#welcomepage)
                    $rootScope.userEmail = null;
                    $window.location.href = '#/auth/signin';
                } else if (user) {
                    // user authenticated with Firebase
                    //change to home page
                    $rootScope.userEmail = user.email;
                    $window.location.href = ('#/bucket/list');
                } else {
                    // user is logged out
                    $rootScope.userEmail = null;
                    $window.location.href = '#/auth/signin';
                }
            });
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth', {
            url: "/auth",
            abstract: true,
            templateUrl: "templates/auth.html"
        })
        .state('auth.signin', {
            url: '/signin',
            views: {
                'auth-signin': {
                    templateUrl: 'templates/auth-signin.html',
                    controller: 'SignInCtrl'
                }
            }
        })
        .state('auth.signup', {
            url: '/signup',
            views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html',
                    controller: 'SignUpCtrl'
                }
            }
        })
        //added welcome page, adjust the controller
        .state('auth.welcome', {
            url: '/welcome',
            views: {
                'auth-welcome': {
                    templateUrl: 'templates/auth-welcome.html'

                }
            }
        })
        .state('bucket', {
            url: "/bucket",
            abstract: true,
            templateUrl: "templates/bucket.html"
        })
        .state('bucket.list', {
            url: '/list',
            views: {
                'bucket-list': {
                    templateUrl: 'templates/bucket-list.html',
                    controller: 'myListCtrl'
                }
            }
        })
        .state('bucket.completed', {
            url: '/completed',
            views: {
                'bucket-completed': {
                    templateUrl: 'templates/bucket-completed.html',
                    controller: 'completedCtrl'
                }
            }
        })
.state('home', {
            url: "/home",
            abstract: true,
            templateUrl: "templates/home.html"
        })
.state('home.welcome', {
            url: '',
            views: {
                'home-wel': {
                    templateUrl: 'templates/home-wel.html'

                }
            }
        })
.state('tour', {
            url: "/tour",
            abstract: true,
            templateUrl: "templates/tour.html"
        })
.state('tour.home', {
            url: '',
            views: {
                'tour-home': {
                    templateUrl: 'templates/tour-home.html'

                }
            }
        })
    .state('tour.about', {
            url: '/about',
            views: {
                'tour-about': {
                    templateUrl: 'templates/tour-about.html'

                }
            }
        })
        .state('tour.map', {
            url: '/map',
            views: {
                'tour-map': {
                    templateUrl: 'templates/tour-map.html',
                     controller: 'MapCtrl'
                  

                }
            }
        })
       .state('tour.facilities', {
            url: '/facilities',
            views: {
                'tour-facilities': {
                    templateUrl: 'templates/tour-facilities.html'

                }
            }
        })
    //Home after Login
.state('land', {
            url: "/land",
            abstract: true,
            templateUrl: "templates/land.html"
        })
.state('land.home', {
            url: '',
            views: {
                'land-home': {
                    templateUrl: 'templates/land-home.html'

                }
            }
        })
    .state('land.news', {
            url: '/news',
            views: {
                'land-news': {
                    templateUrl: 'templates/land-news.html'

                }
            }
        })
 .state('land.notices', {
            url: '/notices',
            views: {
                'land-notices': {
                    templateUrl: 'templates/land-notices.html'

                }
            }
        })
    $urlRouterProvider.otherwise('/home');
});