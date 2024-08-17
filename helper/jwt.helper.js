const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")
const blacklist = new Set();
encrypt = async value => {
	return await bcrypt.hash(value, config.bcryptSaltRound)
}

compareBcrypt = async (userValue, hashedValue) => {
	return await bcrypt.compare(userValue, hashedValue)
}

generateToken = async userData => {
	return JWT.sign(userData, process.env.TOKEN_SECRET, {
		algorithm: process.env.TOKEN_ALGORITHM,
		expiresIn: "1h"
	})
}

verifyJwtToken = token => {
	const tokenData = JWT.verify(token, process.env.TOKEN_SECRET)

	if (tokenData) return tokenData

	return false
}


verifyUser = (req, res, next) => {
	if (req.headers["authorization"]) {
		const bearerToken = req.headers["authorization"].split(" ")[1]

		const result = verifyJwtToken(bearerToken)

		if (result) next()
		else
			responseFormat(
				res,
				statusCode.UNAUTHORIZED_CODE,
				apiResponse.FAILURE,
				responseType.UNAUTHORIZED_REQUEST
			)
	} else {
		responseFormat(
			res,
			statusCode.UNAUTHORIZED_CODE,
			apiResponse.FAILURE,
			responseType.MISSING_TOKEN
		)
	}
}

checkBlacklist = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
console.log(blacklist.has(token))
    if (token && blacklist.has(token)) {
        return res.status(401).send({ message: 'Token is invalidated' });
    }

    next();
}

blackListAdd =(req, res, next)=> {
    const token = req.headers['authorization']?.split(' ')[1];
console.log(blacklist)
    if (token) {
		blacklist.add(token)
		return res.status(401).send({ message: 'Token is LoggedOut' });
    }

    next();
}