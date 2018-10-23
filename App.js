angular.module('Movies', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('movies', {
      url: '/movies/{id}',
      templateUrl: '/movies.html',
      controller: 'MoviesCtrl'
    })
       .state('discussions', {
      url: '/discussions/{id}/{movieID}',
      templateUrl: '/discussions.html',
      controller: 'DiscussionsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]) 
.factory('movieFactory', [function(){
  var o = {
    movies: [  {title: "Batman Trilogy",
      upvotes: 0,
      discussions: [ { title: "Joker Origins",
       comments: [{title: " ...part of the fun of the Joker is hardly knowing anything about him."}
      ],
      upvotes: 0,
        num_of_posts: 1
        
      }
      ],
      movieID: 0,
      num_of_discussions: 1}, {title: "Inception",
      upvotes: 0,
      discussions: [{ title: "Was The Last Scene A Dream?",
       comments: [{title: " I would like to think it was... I like a happy ending."}
      ],
      
      upvotes: 1,
        num_of_posts: 1}
      ],
      movieID: 0,
                  num_of_discussions: 1}, {title: "The Lord Of The Rings",
      upvotes: 0,
      discussions: [{ title: "What Was The Squid Creature Outside Of Moria?",
       comments: [ {title: " According to the Tolkien Gateway its called the Wather in the Water. It says The Watcher in the Water was a mysterious and horrific beast that lurked in a lake caused by the damming of the Sirannon river, beneath the western walls of Moria."}
      ],
      
      upvotes: 0,
        num_of_posts: 1}
      ], movieID: 2,
      num_of_discussions: 1} ]
  };
  return o;

}])
.controller('MainCtrl', [
'$scope',
'movieFactory',




function($scope, movieFactory){
  $scope.test = 'Hello world!';

  $scope.movies = movieFactory.movies;



  $scope.addMovie = function(){
    if($scope.formContent === '') { return; }
    $scope.movies.push({
      title: $scope.formContent,
      upvotes: 0,
      discussions: [
      ],
      movieID: 0,
      num_of_discussions: 0
    });
    $scope.formContent = '';
  };

  $scope.incrementMovies = function(movie) {
    movies.num_of_discussions += 1;
  };

}])
.controller('MoviesCtrl', [
'$scope',
'$stateParams',
'movieFactory',
function($scope, $stateParams, movieFactory){
  $scope.movie = movieFactory.movies[$stateParams.id]; 
  $scope.movie.movieID = $stateParams.id;
  
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.movie.discussions.push({
      
      title: $scope.body,
       comments: [
      ],
      upvotes: 0,
        num_of_posts: 0
    });
    $scope.body = '';
      $scope.movie.num_of_discussions += 1;
  };

  $scope.incrementUpvotes = function(comment){
    comment.upvotes += 1;
  };
}])

.controller('DiscussionsCtrl', [
'$scope',
'$stateParams',
'movieFactory',
function($scope, $stateParams, movieFactory){

  $scope.movie = movieFactory.movies[$stateParams.movieID];
  $scope.discussion = $scope.movie.discussions[$stateParams.id]
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.discussion.comments.push({
      title:$scope.body,
      body: $scope.body,
      upvotes: 0
    });
    $scope.body = '';
    $scope.discussion.num_of_posts += 1;
    console.log($scope.discussion.num_of_posts);
  };

  $scope.incrementUpvotes = function(comment){
    comment.upvotes += 1;
  };
}]);
