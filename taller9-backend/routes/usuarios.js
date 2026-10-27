const express = require("express");
const bcrypt = require("bcryptjs");
const usuarios = require("../datos/usuarios");
const verificarToken = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Debes enviar username y password" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  if (usuarios.some((u) => u.username === username)) {
    return res.status(409).json({ error: "El nombre de usuario ya existe" });
  }

  const nuevoUsuario = {
    id: usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1,
    username,
    passwordHash: await bcrypt.hash(password, 10)
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({ id: nuevoUsuario.id, username: nuevoUsuario.username });
});

router.get("/yo", verificarToken, (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.usuario.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ id: usuario.id, username: usuario.username });
});

module.exports = router;