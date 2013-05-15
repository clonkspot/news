/* Angular News Application */

angular.module('clonkspotNewsApp', [])
  .controller('NewsCtrl', function($scope) {
    // Load the news from the server.
    dpd.news.get({$limit: 4}, function(news, error) {
      $scope.news = news
      $scope.$apply()
    })
  })
