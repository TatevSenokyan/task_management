

exports.authenticate = (req, res, next) => {
    console.log("Start auth checking ---");
    
    if (!req.cookies["name"]) {
        return res.status(403).redirect("/login");
    }

    next();
}