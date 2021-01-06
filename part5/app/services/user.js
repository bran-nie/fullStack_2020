const bcrypt = require('bcrypt');
const User = require('../models/user');

class UserService {
    constructor() {}
    async createUser(request, response) {
        const body = request.body;

        if (body.username.length < 3 || body.password.length < 3) {
            return response.status(401).json({
                error: 'invalid username or password',
            });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        });

        const savedUser = await user.save();

        response.json(savedUser);
    }
    async getAllUsers(request, response) {
        const users = await User.find({})
            .populate('notes', {
                content: 1,
                date: 1,
                important: 1,
            })
            .populate('blogs', {
                url: 1,
                title: 1,
                likes: 1,
                author: 1,
            });
        response.json(users);
    }
}

module.exports = new UserService();
