const authorizaRole = (...allowedRoles)=>
{
    return(req,res,next)=>
    {
        if(!allowedRoles.includes(req.user.role))
        {
            return res.status(403).json({message:"Access Denide"})
        }
        next();
    }
    
};

const roleMiddleware = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
    }
    next();
};


module.exports=authorizaRole,roleMiddleware;