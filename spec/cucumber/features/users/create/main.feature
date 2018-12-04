Feature: Create User

    Clients should be able to send a request to our API in order to create a User
    . Our API should also validate the structure of the payload and respond with an error if
    it is invalid.

    Scenario Outline: Bad Client Requests
        If the client sends a POST request to /users with a unsupported payload, it should receive a response with
        a 4xx status code.

        When the client creates a POST request to /users
        And attaches a generic <payloadType> payload
        And sends the request
        Then our API should respond with a <statusCode> HTTP status code
        And the payload of the response should be a JSON object
        And contains a message property which says <message>

        Examples:
            | payloadType | statusCode | message                                                       |
            | empty       | 400        | "Payload should not be empty"                                 |
            | non-JSON    | 415        | 'The "Content-Type" header must always be "application/json"' |
            | malformed   | 400        | "Payload should be in JSON format"                            |

    Scenario Outline: Bad Request Payload

        When the client creates a POST request to /users
        And attaches a Create User payload which is missing the <missingField> field
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the payload of the response should be a JSON object
        And contains a message property which says "<message>"

        Examples:

            | missingField | message                         |
            | email        | The 'email' field is missing    |
            | password     | The 'password' field is missing |

    Scenario Outline: Request Payload with invalid email format

        When the client creates a POST request to /users
        And attaches a Create User payload where the email field is exactly <email>
        And sends the request
        Then our API should respond with a 400 HTTP status code
        And the payload of the response should be a JSON object
        And contains a message property which says "The 'email' field must be a valid email"

        Examples:
            | email     |
            | a238juqy2 |
            | a@1.2.3.4 |
            | a,b,c@!!  |

    Scenario: Minimal Valid User

        When the client creates a POST request to /users
        And attaches a valid Create User payload
        And sends the request
        Then our API should respond with a 201 HTTP status code
        And the payload of the response should be a string
        And the payload object should be added to the database
        And the newly-created user should be deleted


    Scenario Outline: Valid Profile

        When the client creates a POST request to /users/
        And attaches <payload> as the payload
        And sends the request
        Then our API should respond with a 201 HTTP status code
        And the payload of the response should be a string
        And the payload object should be added to the database
        And the newly-created user should be deleted

        Examples:
            | payload                                                                          |
            | {"email":"ef@ma.il","password":"password","profile":{}}                          |
            | {"email":"eg@ma.il","password":"password","profile":{"name":{}}}                 |
            | {"email":"eb@ma.il","password":"password","profile":{"name":{"first":"Daniel"}}} |
            | {"email":"en@ma.il","password":"password","profile":{"bio":"bio"}}               |
            | {"email":"e@kdma.il","password":"password","profile":{"summary":"summary"}}      |