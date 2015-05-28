Feature: Load Testing

  Scenario: New Account
    Given there are 100,000 users registered on the system
    When I create a new account
    Then I should be taken to my dashboard within 5ms

  Scenario: Access Homepage
    Given 1000 users are hitting the homepage simultaneously
    Then each user should get a response within 2ms