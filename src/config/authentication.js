// authentications.js
export function authenticate(req, res, next) {
    if (req.session?.user === 'email from database' && req.session?.admin) {
      return next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  