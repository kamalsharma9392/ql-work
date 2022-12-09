import jwt from "jsonwebtoken";

export const authenticated = (req, res, next) => {
    if (!req.headers.authorization) return res.status(403).json({ message: 'No credentials sent!' });
    const authHeader = req.headers['authorization'];
    // extracting the token from the header
    const token = authHeader && authHeader.split('Bearer ')[1];
    if(token === null) return res.status(401).json({message:'Token not found'});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({message:'Invalid Token'});
        // extract email from the token and pass it in the request
        req.email = decoded.email;
        next();
    })
}