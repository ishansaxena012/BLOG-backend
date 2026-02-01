// read validated input
// call a service
// shape the http response

import {registerUser, loginUser} from './auth.service.js';
import asyncHandler from '../../utils/asyncHandler.js';

export const register = asyncHandler(async(req,res)=>{
    const user = await registerUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
});

export const login = asyncHandler(async(req,res)=>{
    const result = await loginUser(req.body.email, req.body.password)

    res.status(200).json({
        success: true,
        data: result,
    });
});