import { auth } from "express-oauth2-jwt-bearer";

//the below will check the bearer token and checks it with the login user token
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL,
  tokenSigningAlg: "RS256",
});
