# simple-auth-login
Simple auth system made using Node.js at back-end and MongoDB as database.

## Routes
### get /
Home, returns "running"

### get /users
Returns all users listed in db

### get /find
Given request body with any email and a password, returns true if email and password exists in DB (i.e., user exists), returns false if not.

### post /user
Given request body with any email and a password, returns "Sucessfully added user" if email did not exist in database (i.e., user did not existed), returns "Error adding user, please try again" if email did exist in database (i.e., that email is already at db).