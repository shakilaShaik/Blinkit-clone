const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req?.headers?.authorization?.split('')[1]

        console.log(token);
        if (!token) {
            return res.json({
                message: "provide token"
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)

        if (!decode) {
            return res.json({
                message: "unauthorized access",
                error: true,
                success: false
            })

        }
        req.userId = decode.id
        next()
    }
    catch (error) {
        return res.json({
            success: false,
            message: error.message,
            error: true
        })
    }

}
export default auth

