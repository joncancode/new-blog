import User from './user.model'

export async function signUp(reg, res) {
  try {
    const user = await User.create(reg.body)
    return res.status(201).json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
}

export function login(req, res, next) {
  res.status(200).json(req.user)

  return next()
}
