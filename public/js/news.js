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

    // Save the edited news items on the server.
    $scope.updateNewsItems = function() {
      $scope.news.forEach(function(item) {
        dpd.news.post(item, function(result, error) {
          if (error)
            alert('There was an error while saving: ' + error)
        })
      })
    }
  })
