const jwt = require('@hapi/jwt');

const authenticateToken = (token) => {
    try{
      const artifacts = jwt.token.decode(token);      
      jwt.token.verifySignature(artifacts, "");
      
      return true;
    }
    catch (error){      
        console.log(error.message);
      return false;
    }
}

const generateToken = (key) => {
    return jwt.token.generate(key, "");
}

module.exports = {
    authenticateToken,
    generateToken,
};