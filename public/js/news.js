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

    // Whether the admin view or the slider is shown.
    $scope.adminView = false

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

    // Logout
    $scope.logout = function() {
      dpd.users.logout(function(result, error) {
        if (error)
          alert('Could not log out: ' + error)
        else {
          $scope.me = null
          $scope.$apply()
        }
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
      n.unshift({
        author: $scope.me.username,
        date: new Date().toISOString().slice(0, 10)
      })
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

  // Toggles a variable when pressing a certain key combination.
  .directive('keyToggle', function() {
    return function(scope, element, attrs) {
      var keys = attrs.keys.split('+'),
          toggle = attrs.keyToggle
      angular.element(document).bind('keydown', function(event) {
        for (var i = 0; i < keys.length; i++) {
          if (keys[i].charCodeAt() != event.which && !event[keys[i].toLowerCase()+'Key']) {
            return;
          }
        }
        scope[toggle] = !scope[toggle]
        scope.$apply()
      })
    }
  })
