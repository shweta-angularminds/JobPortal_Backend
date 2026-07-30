import { Request,Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { STATUS_BAD_REQUEST } from "../constants/status/http.status";

export const validateRequest = (
    req:Request,
    res: Response,
    next:NextFunction,
) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(STATUS_BAD_REQUEST).json({
            success:false,
            errors:errors.array(),
        })
    }
    next()
}