const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request.headers.authorization;

    if( !token ) {
        return response.status(401).json({ message: 'Authentication required.' });
    }

    const tokenValid = jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if( !err ) {
            return true;
        }

        return false;
    })

    if( !tokenValid ) {
        return response.status(401).json({ message: 'Invalid token.' });
    }

    next();
}