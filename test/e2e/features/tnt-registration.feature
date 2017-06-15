Feature: TNT Registration page
  The registration page
  enables the user to
  register in the website

  @LocalServer
  Scenario: The bank name on header
    Given I am in registration page
    When I enter the username
    When I enter the password
    Then The password validation should happen
    When I enter the confirm password
    Then The confirm password should match with the password


