// Middleware de autenticación.
// 5: Importar jsonwebtoken.
// 5: Crear el middleware verificarToken.
// 5: Exportar el middleware.

const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.replace("Bearer ", "");
  req.usuario = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

module.exports = verificarToken;