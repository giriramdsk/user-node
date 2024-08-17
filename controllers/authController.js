const User = require('../models/User');

exports.signup = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            mobile,
            password,
        });

        await user.save();
        console.log(user)

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await compareBcrypt(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
       const token =  await generateToken(payload)

        // Send the token and user info to the client
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};
const JWT = require("jsonwebtoken")

exports.logout = async(req,res)=>{
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token)
    if (token) {
       await blacklist.add(token); 
    }
    res.status(200).send({ message: 'Logged out successfully' });
}
