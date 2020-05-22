const { openConnection } = require('../../database/connection');
const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    const token = request.headers.authorization;
    const { userId } = jwt.decode(token);
    const toolId = request.params.id;

    console.log(`${userId} - ${toolId}`);

    const connection = openConnection();

    const tool = await connection('tools')
        .where('tools.id', '=', toolId)
        .where('tools.userId', '=', userId)
        .first()

    connection.destroy()

    if( tool ) {
        next();
    }
    else {
        return response.status(401).json({ message: 'You do not have permission to modify this tool' });
    }
}