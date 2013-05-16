/* Angular News Application */

angular.module('clonkspotNewsApp', [])
  .controller('NewsCtrl', function($scope) {
    // Load the news from the server.
    dpd.news.get({$limit: 4, $sort: {date: -1}}, function(news, error) {
      $scope.news = news
      $scope.$apply()
    })

    // Check for authentication.
    dpd.users.me(function(result, error) {
      $scope.me = result
      $scope.$apply()
    })

    $scope.login = {}

    // Login
    $scope.authenticate = function(credentials) {
      dpd.users.login(credentials, function(result, error) {
        $scope.me = result
        $scope.$apply()
        if (error)
          alert('Could not log in: ' + error)
      })
    }

    // The item that is being edited.
    $scope.editItem = 1

    // Change above item.
    $scope.changeEditItem = function(to) {
      $scope.editItem = to
    }

    // Adds another news item on top.
    $scope.addItem = function() {
      var n = $scope.news.slice(0, 3)
      n.unshift({})
      $scope.news = n
    }

    // Save the edited news items on the server.
    $scope.updateNewsItems = function() {
      $scope.news.forEach(function(item, index) {
        dpd.news.post(item, function(result, error) {
          if (error)
            alert('There was an error while saving: ' + error)
          else
            $scope.news[index] = result
        })
      })
    }
  })
