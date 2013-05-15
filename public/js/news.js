/* Angular News Application */

angular.module('clonkspotNewsApp', [])
  .controller('NewsCtrl', function($scope) {
    // Load the news from the server.
    dpd.news.get({$limit: 4}, function(news, error) {
      $scope.news = news
      $scope.$apply()
    })

    // The item that is being edited.
    $scope.editItem = 1

    // Change above item.
    $scope.changeEditItem = function(to) {
      $scope.editItem = to
    }

    // Save the edited news item on the server.
    $scope.updateNewsItem = function(item) {
      console.log('Updating item', item)
    }
  })
