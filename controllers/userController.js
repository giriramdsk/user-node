const User = require('../models/User');

exports.listUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'firstName', sortOrder = 'asc', search = '' } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
        };
        
        const query = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobile: { $regex: search, $options: 'i' } }
            ]
        };
        
        const users = await User.paginate(query, options);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
