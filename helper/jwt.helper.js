const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken")

encrypt = async value => {
	return await bcrypt.hash(value, config.bcryptSaltRound)
}

compareBcrypt = async (userValue, hashedValue) => {
	return await bcrypt.compare(userValue, hashedValue)
}

generateToken = async userData => {
	return JWT.sign(userData, process.env.TOKEN_SECRET, {
		algorithm: process.env.TOKEN_ALGORITHM,
		expiresIn: "24h"
	})
}

verifyJwtToken = token => {
	const tokenData = JWT.verify(token, config.jwt.token_secret)

	if (tokenData) return tokenData

	return false
}

verifyUser = () => (req, res, next) => {
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

parseToken = token => {
	if (!token) return {}

	const [, payload] = token.split(".")

	const base64UserId = payload.replace(/-/g, "+").replace(/_/g, "/")

	const bufferValue = Buffer.from(base64UserId, "base64").toString("utf-8")

	const user = bufferValue ? JSON.parse(bufferValue) : {}

	return user
}
