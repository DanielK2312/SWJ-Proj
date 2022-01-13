Authentication Flow - Security Centered

When a user logins in, they get sent two tokens:
1) Access Token
    This has a short life and is used in all authentication requests.
    Set lifespan: 30 minutes
    Frontend Storage: Use local-storage.
        (can be less secure as lifespan is shorter)
        [How To](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
2) Refresh Token
    This has a long life and is used to refresh the above access token.
    Set lifespan: 3 days
    Frontend Storage: Use httpOnly cookie with SameSite attrib. 
        THIS IS CREATED AND READ ONLY BY THE BACKEND :)
        As the frontend cannot read the cookie data, the only interaction will be to
        delete the refresh_token cookie on logout. It will be included on every 
        request sent by the frontend.

Whenever an secure route is accessed, the access token needs to be set
under the [x-access-token] HEADER. Using the refresh token will result in a
403 unauthorized connection.

If the access token results in a 403 unauthorized connection, the refresh token will 
be used to attempt to generate a new access token.

IF NO REFRESH TOKEN EXISTS, USER WILL NEED TO RE-AUTHENTICATE WITH EMAIL AND PASSWORD.

As another security precaution, the API endpoints can only be accessed at localhost.
