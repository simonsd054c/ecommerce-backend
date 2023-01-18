const jwt = require("jsonwebtoken")

function admin(request, response, next) {
    if(!request.payload.is_admin) {
        return response.status(401).json({data: "Unauthenticated/Not an admin"})
    }
    next()
}

// function admin(request, response, next) {
//     //get the token from the authorization header
//     let token = request.get("authorization") //bearer token format: `Bearer token`
//     token =  token?.split(" ")?.[1] // token //optional chaining
//     //check if token exists
//     if (!token) {
//         return response.status(401).json({ data: "Unauthenticated" })
//     }
//     //verify the token using the secret key
//     try {
//         // successfully verifies, gives payload. not verified, throws error
//         const payload = jwt.verify(token, "secret")
//         //check if the user is admin
//         if(!payload.is_admin) {
//             throw new Error()
//         }
//         //put the payload(id) in the request for other functions to use
//         request.userId = payload.id
//         next()
//     } catch(err) {
//         console.log(err)
//         return response.status(401).json({ data: "Unauthenticated/Not an admin" })
//     }
// }

module.exports = admin
