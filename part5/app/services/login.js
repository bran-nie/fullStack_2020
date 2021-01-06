const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

class LoginServices {
    constructor() {}
    async login(request, response) {
        const { body } = request;

        const user = await User.findOne({ username: body.username });
        const passwordCorrect =
            user === null
                ? false
                : await bcrypt.compare(body.password, user.passwordHash);

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password',
            });
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        };

        // eslint-disable-next-line no-undef
        const token = jwt.sign(userForToken, process.env.SECRET);

        response
            .status(200)
            .send({ token, username: user.username, name: user.name });
    }
}

module.exports = new LoginServices();
