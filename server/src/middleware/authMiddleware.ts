import jwt from "jsonwebtoken";
import {Response, NextFunction } from "express";


// Authentication Middleware
export function auth(req: any, res: Response, next: NextFunction) {
    const token = req.header("auth");
    if (!token) return res.status(401).send("Access Denied, no token Provided");
  
    try {
      //console.log(token);
      const decoded = jwt.verify(token, "jwtsecret");
      req.user = decoded;

      next();
    } catch (error) {
      res.status(400).send("Invalid token provided");
    }
  }
  
