import jwt from 'jsonwebtoken';

export async function auth(req, res, next) {
  const token = req.headers['token']; // safer way to read header
  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecode.id };  // attach to req.user instead of req.body
    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token", error: error.message });
  }
}
