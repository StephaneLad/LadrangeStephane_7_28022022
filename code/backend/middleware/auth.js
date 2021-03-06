const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'clef')
    const userId = decodedToken.userId
    if (req.body.id_user && req.body.id_user !== userId) {
      throw 'Invalid user ID'
    } else {
      next()

    }
  } catch {res.status(401).json({error: new Error('Invalid request!')})
  }
}