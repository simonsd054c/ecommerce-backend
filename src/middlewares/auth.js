const jwt = require("jsonwebtoken")

function auth(request, response, next) {
    //get the token from the authorization header
    let token = request.get("authorization") //bearer token format: `Bearer token`
    token =  token?.split(" ")?.[1] // token //optional chaining
    //check if token exists
    if (!token) {
        return response.status(401).json({ data: "Unauthenticated" })
    }
    //verify the token using the secret key
    try {
        // successfully verifies, gives payload. not verified, throws error
        const payload = jwt.verify(token, "secret")
        //put the payload(id) in the request for other functions to use
        request.payload = payload
        next()
    } catch(err) {
        console.log(err)
        return response.status(401).json({ data: "Unauthenticated" })
    }
}

module.exports = auth
