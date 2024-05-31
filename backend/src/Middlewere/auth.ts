import { NextFunction,Request,Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import User from "../model/user";
//the below will check the bearer token and checks it with the login user token

//mentioning for typescript for appending 
//adding custom properties
declare global{
  namespace Express{
    interface Request{
      userId: string;
      auth0Id: string;
    }
  }
}
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUE_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (req:Request,res:Response,next:NextFunction) => {
  //get access token from authorization header
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }
  const token = authorization.split(" ")[1];
  // decode token
  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload; //got token and decoded
    const auth0Id = decoded.sub;

    const user = await User.findOne({ auth0Id }); //search auth0id

    if (!user) {
      return res.sendStatus(401);
    }
    //appending info about user
    req.auth0Id = auth0Id as string; //they are just strings
    req.userId = user._id.toString();
    next();
  }
  catch (error) {
    return res.sendStatus(401);
  }
}