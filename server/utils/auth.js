const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '6h';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authCheckMiddleware: function({req, res, next}) {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if(token) {
      jwt.verify(token, secret, { maxAge: expiration })
      .then((result) => {
        next()
      })
      .catch(error => console.log(error))
    } else {
      res.json({error: 'Unauthorized'})
    }
  }

};


