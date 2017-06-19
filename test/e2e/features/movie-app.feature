Feature: Movie App Application page
  The Search page
  enables the user to
  search movies in the website

  @LocalServer
  Scenario: The movie app name on header
    Given I am in search page
    When I enter the movie name
    Then The search movie should appear on the screen


Feature: Movie App Application page
  The Feature page
  enables the user to
  see the featured movies in the website

  @LocalServer
  Scenario: The bank name on header
    Given I am in featured page
    When I am in featured page
    Then The featured movies should happen


