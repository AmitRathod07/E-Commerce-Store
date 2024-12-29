const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ error:"Access Denied" });

    try {
        const decode = jwt.verify(token, "seceret");
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ error:"Invalid Token" });
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(400).send({ error: "Forbidden" })
    }
}

module.exports = { verifyToken, isAdmin }