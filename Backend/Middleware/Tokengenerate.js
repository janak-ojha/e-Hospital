const jwt = require("jsonwebtoken");

const TokenGenerate = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1000h",
    });
}

module.exports = TokenGenerate;